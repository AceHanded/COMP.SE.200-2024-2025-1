/* eq.test.js */

import eq from '../src/eq.js';

const test_object = {'a': 1}
const test_other = {'a': 1}

describe('eq', () => {
  test('Equal number values', () => {
    expect(eq(1,1)).toBe(true);
    expect(eq(NaN,NaN)).toBe(true);
    expect(eq(2+3,5)).toBe(true);
    expect(eq(2.5, 2.5000)).toBe(true);
    expect(eq(test_object.a,test_other.a)).toBe(true);
  });

  test('Non-equal number values', () => {
    expect(eq(1,2)).toBe(false);
    expect(eq(-4,4)).toBe(false);
    expect(eq(-Infinity, Infinity)).toBe(false);
  });

  test('String values', () => {
    expect(eq("test","test")).toBe(true);
    expect(eq("a","b")).toBe(false);
  });

  test('Boolean values', () => {
    expect(eq(true,true)).toBe(true);
    expect(eq(false,false)).toBe(true);
    expect(eq(true,false)).toBe(false);
  });

  test('Object values', () => {
    expect(eq(test_object,test_object)).toBe(true);
    expect(eq(test_object,test_other)).toBe(false);
    expect(eq([1,2],[1,2])).toBe(false);
  });

  test('Value and other are different types, equal', () => {
    expect(eq(1,'1')).toBe(true);
    expect(eq(false, 0)).toBe(true);
    expect(eq('test',Object('test'))).toBe(true);
    expect(eq(Object(2), String(2))).toBe(true);
  });

  test('Value and other are different types, non-equal', () => {
    expect(eq(1,"test")).toBe(false);
    expect(eq("true", true)).toBe(false);
  });

  test('Value or other is undefined', () => {
    expect(eq(1,)).toBe(false);
    expect(eq(undefined,"test")).toBe(false);
    expect(eq()).toBe(true);
  });

  test('Null and undefined are equal', () => {
    expect(eq(null, undefined)).toBe(true);
  });

});
