/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import { convertBoolean, convertInt, convertNumber, convertString } from '../../src/parser/value-converter';

describe('Value conversion', () => {

    test('string conversion', () => {
        expect(convertString('"foo"')).toBe('foo');
        expect(convertString('food')).toBe('oo'); // TODO should it throw an error instead?
    });

    test('int conversion', () => {
        expect(convertInt('123')).toBe(123);
        expect(convertInt('123.7')).toBe(123); // TODO should it throw an error instead?
    });

    test('number conversion', () => {
        expect(convertNumber('123.456')).toBe(123.456);
    });

    test('boolean conversion', () => {
        expect(convertBoolean('true')).toBe(true);
        expect(convertBoolean('false')).toBe(false);
    });

});

