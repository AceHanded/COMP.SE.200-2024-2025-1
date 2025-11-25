/* toInteger.test.js */

import toInteger from '../src/toInteger.js';

describe('toInteger: tests based on phase 1 test plan', () => {
  test('Value is number with decimals', () => {
    expect(toInteger(3.124)).toBe(3);
    expect(toInteger(1.5)).toBe(1);
    expect(toInteger(-2.999)).toBe(-2);
  });

  test('Value is whole number', () => {
    expect(toInteger(2)).toBe(2);
  });

  test('Value is close to zero', () => {
    expect(toInteger(1.42e-10)).toBe(0);
    expect(toInteger(Number.MIN_VALUE)).toBe(0);
  });

  test('Value is far from zero', () => {
    expect(toInteger(5.4321e3)).toBe(5.432e3);
    expect(toInteger(Number.MAX_VALUE)).toBe(Number.MAX_VALUE)
    expect(toInteger(Infinity)).toBe(Number.MAX_VALUE)
    expect(toInteger(-Infinity)).toBe(-Number.MAX_VALUE)
  });

  test('Value is a valid number with type String', () => {
    expect(toInteger("12.21")).toBe(12);
    expect(toInteger("Infinity")).toBe(Number.MAX_VALUE)
  });

  test('Value is a non-valid number with type string', () => {
    expect(toInteger("test")).toBe(0);
    expect(toInteger("4,5")).toBe(0);
  });

  test('Value is undefined', () => {
    expect(toInteger()).toBe(0);
  });
});

describe('toInteger: tests NOT based on phase 1 test plan', () => {
  test('Value is null', () => {
    expect(toInteger(null)).toBe(0);
  });

  test('Value is NaN', () => {
    expect(toInteger(NaN)).toBe(0);
  });

  test('Value is an object', () => {   
    expect(toInteger([1.24, 25])).toBe(0);
    expect(toInteger({test:"value"})).toBe(0);
  });
});

/*
describe('toInteger: AI-assisted tests (using MS Copilot)', () => {
  test('placeholder', () => {
    expect(true).toBe(true);
  });
});
*/