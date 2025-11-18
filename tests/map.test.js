/* map.test.js */

import map from '../src/map.js';

const addOne = (n) => +n + 1;

describe('map', () => {
  test('array and function are valid', () => {
    expect(map([1, 2, 3], addOne)).toHaveLength(3).toEqual([2, 3, 4]);
    expect(map(['1', '2', '3'], addOne)).toHaveLength(3).toEqual([2, 3, 4]);
    expect(map([1.5, 2.5, 3.5], addOne)).toHaveLength(3).toEqual([2.5, 3.5, 4.5]);
    expect(map([1, '2', 3.5], addOne)).toHaveLength(3).toEqual([2, 3, 4.5]);
  });

  test('function is null', () => {
    expect(() => map([1, 2, 3], null)).toThrow(TypeError);
  });

  test('function is undefined', () => {
    expect(() => map([1, 2, 3], undefined)).toThrow(TypeError);
  });

  test('function is NaN', () => {
    expect(() => map([1, 2, 3], NaN)).toThrow(TypeError);
  });

  test('function throws error', () => {
    expect(() => map([1, 2, 3], () => { throw new TypeError() })).toThrow(TypeError);
  });

  test('function returns truthy', () => {
    expect(map([1, 2, 3], () => 1)).toHaveLength(3).toEqual([1, 1, 1]);
    expect(map([1, 2, 3], () => 'Hello, World!')).toHaveLength(3).toEqual(['Hello, World!', 'Hello, World!', 'Hello, World!']);
  });

  test('function returns falsy', () => {
    expect(map([1, 2, 3], () => 0)).toHaveLength(3).toEqual([0, 0, 0]);
    expect(map([1, 2, 3], () => {})).toHaveLength(3).toEqual([undefined, undefined, undefined]);
  });

  test('array is a string', () => {
    expect(map('123', addOne)).toHaveLength(3).toEqual([2, 3, 4]);
    expect(map('123', (n) => n + n)).toHaveLength(3).toEqual(['11', '22', '33']);
  });

  test('array is empty', () => {
    expect(map([], addOne)).toBeEmpty();
  });

  test('array contains single element', () => {
    expect(map([3], addOne)).toHaveLength(1).toEqual([4]);
    expect(map([1], addOne)).toHaveLength(1).toEqual([2]);
  });

  test.failing('array is non-iterable', () => {
    expect(map(123, addOne)).toBe(123);
    expect(map(true, addOne)).toBe(true);
  });

  test.failing('array is null', () => {
    expect(map(null, addOne)).toBeNull();
  });

  test.failing('array is undefined', () => {
    expect(map(undefined, addOne)).toBeUndefined();
  });

  test.failing('array is NaN', () => {
    expect(map(NaN, addOne)).toBeNaN();
  });

  test('equal to built-in', () => {
    expect(map([1, 2, 3], addOne)).toEqual([1, 2, 3].map(addOne));
    expect(map([], addOne)).toEqual([].map(addOne));
  });
});
