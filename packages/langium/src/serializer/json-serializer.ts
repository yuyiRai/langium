/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import { AstNode, Reference } from '../syntax-tree';
import { Linker, getReferenceId } from '../references/linker';
import { LangiumServices } from '../services';
import { isAstNode, isReference } from '../utils/ast-util';

export interface JsonSerializer {
    serialize(node: AstNode, space?: string | number): string
    deserialize(content: string): AstNode
}

export class DefaultJsonSerializer {

    private readonly linker: Linker;

    constructor(services: LangiumServices) {
        this.linker = services.references.Linker;
    }

    serialize(node: AstNode, space?: string | number): string {
        return JSON.stringify(this.decycle(node, '$container', '$document', '$cstNode'), undefined, space);
    }

    deserialize(content: string): AstNode {
        return this.revive(JSON.parse(content));
    }

    protected decycle(object: AstNode, ...ignore: string[]): unknown {
        const objects = new Set<unknown>(); // Keep references to each unique object

        const replace = (item: unknown) => {
            // The replace function recurses through the object, producing the deep copy.
            if (typeof item === 'object' && item !== null) {
                if (objects.has(item)) {
                    throw new Error('Cycle in ast detected.');
                } else {
                    objects.add(item);
                }
                // If it is a reference, just return the name
                if (isReference(item)) {
                    return { $refText: item.$refText } as Reference; // surprisingly this cast works at the time of writing, although $refNode is absent
                }
                let newItem: Record<string, unknown> | unknown[];
                // If it is an array, replicate the array.
                if (Array.isArray(item)) {
                    newItem = [];
                    for (let i = 0; i < item.length; i++) {
                        newItem[i] = replace(item[i]);
                    }
                } else {
                    // If it is an object, replicate the object.
                    newItem = {};
                    for (const [name, itemValue] of Object.entries(item)) {
                        if (!ignore.includes(name)) {
                            newItem[name] = replace(itemValue);
                        }
                    }
                }
                return newItem;
            }
            return item;
        };
        return replace(object);
    }

    protected revive(object: AstNode): AstNode {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const internalRevive = (value: Record<string, any>, container?: unknown, propName?: string) => {
            if (value && typeof value === 'object' && value !== null) {
                if (Array.isArray(value)) {
                    // eslint-disable-next-line @typescript-eslint/prefer-for-of
                    for (let i = 0; i < value.length; i++) {
                        const item = value[i];
                        if (isReference(item) && isAstNode(container)) {
                            const refId = getReferenceId(container.$type, propName!);
                            const reference = this.linker.buildReference(container as AstNode, item.$refNode, refId, item.$refText);
                            value[i] = reference;
                        } else if (typeof item === 'object' && item !== null) {
                            internalRevive(item, item);
                            item.$container = container;
                        }
                    }
                } else {
                    for (const [name, item] of Object.entries(value)) {
                        if (typeof item === 'object' && item !== null) {
                            if (isReference(item)) {
                                const refId = getReferenceId(value.$type, name);
                                const reference = this.linker.buildReference(value as AstNode, item.$refNode, refId, item.$refText);
                                value[name] = reference;
                            } else if (Array.isArray(item)) {
                                internalRevive(item, value, name);
                            } else {
                                internalRevive(item);
                                item.$container = value;
                            }
                        }
                    }
                }
            }
        };
        internalRevive(object);
        return object;
    }
}
