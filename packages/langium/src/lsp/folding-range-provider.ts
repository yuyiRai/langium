/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import { CancellationToken, FoldingRange, FoldingRangeKind, FoldingRangeParams } from 'vscode-languageserver';
import { LangiumDocument } from '../documents/document';
import { LeafCstNodeImpl } from '../parser/cst-node-builder';
import { LangiumServices } from '../services';
import { AstNode, CstNode } from '../syntax-tree';
import { AstNodeContent, streamAllContents } from '../utils/ast-util';
import { streamCst } from '../utils/cst-util';
import { MaybePromise } from '../utils/promise-util';

export interface FoldingRangeProvider {
    /**
     * Handle a folding range request.
     *
     * @throws `OperationCancelled` if cancellation is detected during execution
     * @throws `ResponseError` if an error is detected that should be sent as response to the client
     */
    getFoldingRanges(document: LangiumDocument, params: FoldingRangeParams, cancelToken?: CancellationToken): MaybePromise<FoldingRange[]>;
}

export type FoldingRangeAcceptor = (foldingRange: FoldingRange) => void;

export class DefaultFoldingRangeProvider implements FoldingRangeProvider {

    protected readonly commentNames: string[];

    constructor(services: LangiumServices) {
        this.commentNames = services.parser.GrammarConfig.multilineCommentRules;
    }

    getFoldingRanges(document: LangiumDocument): MaybePromise<FoldingRange[]> {
        const foldings: FoldingRange[] = [];
        const acceptor: FoldingRangeAcceptor = (foldingRange) => foldings.push(foldingRange);
        this.collectFolding(document, acceptor);
        return foldings;
    }

    protected collectFolding(document: LangiumDocument, acceptor: FoldingRangeAcceptor): void {
        const root = document.parseResult?.value;
        if (root) {
            if (this.shouldProcessContent(root)) {
                const treeIterator = streamAllContents(root).iterator();
                let result: IteratorResult<AstNodeContent>;
                do {
                    result = treeIterator.next();
                    if (!result.done) {
                        const node = result.value.node;
                        if (this.shouldProcess(node)) {
                            this.collectObjectFolding(document, node, acceptor);
                        }
                        if (!this.shouldProcessContent(node)) {
                            treeIterator.prune();
                        }
                    }
                } while (!result.done);
            }

            this.collectCommentFolding(document, root, acceptor);
        }
    }

    /**
     * Template method to determine whether the specified `AstNode` should be handled by the folding range provider.
     * Returns true by default for all nodes. Returning false only ignores the specified node and not its content.
     * To ignore the content of a node use `shouldProcessContent`.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected shouldProcess(node: AstNode): boolean {
        return true;
    }

    /**
     * Template method to determine whether the content/children of the specified `AstNode` should be handled by the folding range provider.
     * Returns true by default for all nodes. Returning false ignores _all_ content of this node, even transitive ones.
     * For more precise control over foldings use the `shouldProcess` method.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected shouldProcessContent(node: AstNode): boolean {
        return true;
    }

    protected collectObjectFolding(document: LangiumDocument, node: AstNode, acceptor: FoldingRangeAcceptor): void {
        const cstNode = node.$cstNode;
        if (cstNode) {
            const foldingRange = this.toFoldingRange(document, cstNode);
            if (foldingRange) {
                acceptor(foldingRange);
            }
        }
    }

    protected collectCommentFolding(document: LangiumDocument, node: AstNode, acceptor: FoldingRangeAcceptor): void {
        const cstNode = node.$cstNode;
        if (cstNode) {
            for (const node of streamCst(cstNode)) {
                if (node instanceof LeafCstNodeImpl && this.commentNames.includes(node.tokenType.name)) {
                    const foldingRange = this.toFoldingRange(document, node, FoldingRangeKind.Comment);
                    if (foldingRange) {
                        acceptor(foldingRange);
                    }
                }
            }
        }
    }

    protected toFoldingRange(document: LangiumDocument, node: CstNode, kind?: string): FoldingRange | undefined {
        const range = node.range;
        const start = range.start;
        let end = range.end;
        // Don't generate foldings for nodes that are less than 3 lines
        if (end.line - start.line < 2) {
            return undefined;
        }
        // As we don't want to hide the end token like 'if { ... --> } <--',
        // we simply select the end of the previous line as the end position
        if (!this.includeLastFoldingLine(node, kind)) {
            end = document.textDocument.positionAt(document.textDocument.offsetAt({ line: end.line, character: 0 }) - 1);
        }
        return FoldingRange.create(start.line, end.line, start.character, end.character, kind);
    }

    /**
     * Template method to determine whether the folding range for this cst node should include its last line.
     * Returns false by default for ast nodes which end in braces and for comments.
     */
    protected includeLastFoldingLine(node: CstNode, kind?: string): boolean {
        if (kind === FoldingRangeKind.Comment) {
            return false;
        }

        const nodeText = node.text;
        const endChar = nodeText.charAt(nodeText.length - 1);
        if (endChar === '}' || endChar === ')' || endChar === ']') {
            return false;
        }

        return true;
    }

}
