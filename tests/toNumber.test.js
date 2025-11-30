/* toNumber.test.js */

import toNumber from '../src/toNumber.js';

const test_symbol = Symbol(64);

const test_obj = {
  name: 'test',
  valueOf: 4 //Overrides the valueOf method with a Number
}

describe('toNumber', () => {
  test('Value type is Number', () => {
    expect(toNumber(3)).toBe(3);
    expect(toNumber(-1.5)).toBe(-1.5);
    expect(toNumber(NaN)).toBe(NaN);
    expect(toNumber(Infinity)).toBe(Infinity);
    expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
  });

  test('Value type is String, is a number', () => {
    expect(toNumber('3')).toBe(3);
    expect(toNumber('-1.5')).toBe(-1.5);
    expect(toNumber('Infinity')).toBe(Infinity);
    expect(toNumber("5e+324")).toBe(5e+324);
  });

  test('Value type is String, is not a number', () => {
    expect(toNumber('test')).toBe(NaN);
    expect(toNumber('3*4')).toBe(NaN);
    expect(toNumber('3,5')).toBe(NaN);
  });

  test('Value includes whitespace', () => {
    expect(toNumber('   4  ')).toBe(4);
    expect(toNumber('   string')).toBe(NaN);
  });

  test('Value is binary string', () => {
    expect(toNumber('0b101')).toBe(5);
  });

  test('Value is hexadecimal string', () => {
    expect(toNumber('0xA5')).toBe(165);
  });

  test('Value is bad hexadecimal string', () => {
    expect(toNumber('-0xA5')).toBe(NaN);
  });

  test('Value is octal string', () => {
    expect(toNumber('0o62')).toBe(50);
  });

  test.failing('Value is an empty string', () => {
    expect(toNumber('')).toBe(NaN);
    expect(toNumber(' ')).toBe(NaN);
  });

  test('Value type is Symbol', () => {
    expect(toNumber(test_symbol)).toBe(NaN);
  });

  test('Value type is Boolean', () => {
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  test('Value is an object', () => {
    expect(toNumber([1,2])).toBe(NaN);
    expect(toNumber(Object(0))).toBe(0);
    expect(toNumber(test_obj)).toBe(NaN);
  });

  test('Value is undefined', () => {
    expect(toNumber()).toBe(NaN);
  });
});
