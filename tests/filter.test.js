/* filter.test.js */

import filter from '../src/filter.js';

const lessThanTwo = (n) => +n < 3;

describe('filter', () => {
  test('array and function are valid', () => {
    expect(filter([1, 2, 3], lessThanTwo)).toHaveLength(2).toEqual([1, 2]);
    expect(filter(['1', '2', '3'], lessThanTwo)).toHaveLength(2).toEqual(['1', '2']);
    expect(filter([1.5, 2.5, 3.5], lessThanTwo)).toHaveLength(2).toEqual([1.5, 2.5]);
    expect(filter([1, '2', 3.5], lessThanTwo)).toHaveLength(2).toEqual([1, '2']);
  });

  test('function is null', () => {
    expect(() => filter([1, 2, 3], null)).toThrow(TypeError);
  });

  test('function is undefined', () => {
    expect(() => filter([1, 2, 3], undefined)).toThrow(TypeError);
  });

  test('function is NaN', () => {
    expect(() => filter([1, 2, 3], NaN)).toThrow(TypeError);
  });

  test('function throws error', () => {
    expect(() => filter([1, 2, 3], () => { throw new TypeError() })).toThrow(TypeError);
  });

  test('function returns truthy', () => {
    expect(filter([1, 2, 3], () => 1)).toHaveLength(3).toEqual([1, 2, 3]);
    expect(filter([1, 2, 3], () => 'Hello, World!')).toHaveLength(3).toEqual([1, 2, 3]);
  });

  test.failing('function returns falsy', () => {
    expect(filter([1, 2, 3], () => 0)).toBeEmpty();
    expect(filter([1, 2, 3], () => {})).toBeEmpty();
  });

  test.failing('array is empty', () => {
    expect(filter([], lessThanTwo)).toBeEmpty();
  });

  test.failing('array contains single element', () => {
    expect(filter([3], lessThanTwo)).toHaveLength(1).toEqual([3]);
    expect(filter([1], lessThanTwo)).toBeEmpty();
  });

  test.failing('array is null', () => {
    expect(filter(null, lessThanTwo)).toBeNull();
  });

  test.failing('array is undefined', () => {
    expect(filter(undefined, lessThanTwo)).toBeUndefined();
  });

  test.failing('array is NaN', () => {
    expect(filter(NaN, lessThanTwo)).toBeNaN();
  });

  test.failing('equal to built-in', () => {
    expect(filter([1, 2, 3], lessThanTwo)).toEqual([1, 2, 3].filter(lessThanTwo));
    expect(filter([], lessThanTwo)).toEqual([].filter(lessThanTwo));
  });
});
