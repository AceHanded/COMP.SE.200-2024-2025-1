/* reduce.test.js */

import reduce from '../src/reduce.js';

describe('reduce', () => {
  test('function is null', () => {
    expect(() => reduce([1, 2, 3], null, 0)).toThrow(TypeError);
  });

  test('function is undefined', () => {
    expect(() => reduce([1, 2, 3], undefined, 0)).toThrow(TypeError);
  });

  test('function is NaN', () => {
    expect(() => reduce([1, 2, 3], NaN, 0)).toThrow(TypeError);
  });

  test('function throws error', () => {
    expect(() => reduce([1, 2, 3], () => { throw new TypeError() }, 0)).toThrow(TypeError);
  });

  test('collection is an array', () => {
    expect(reduce([1, 2, 3], (acc, n) => acc + n, 0)).toBe(6);
    expect(reduce(['1', '2', '3'], (acc, n) => acc + n, '')).toBe('123');
  });

  test('collection is an object', () => {
    expect(reduce({'a': 1, 'b': 2, 'c': 3}, (acc, n) => acc + n, 0)).toBe(6);
    expect(reduce({'a': 1, 'b': 2, 'c': 3}, (acc, _, key) => acc + key,'')).toBe('abc');
    expect(reduce({'a': 1, 'b': 2, 'c': 3}, (acc, val, key) => acc + val + key,'')).toBe('1a2b3c');
  });

  test('collection is a string', () => {
    expect(reduce('123', (acc, n) => acc + n, '')).toBe('123');
    expect(reduce('123', (acc, n) => acc + n, 0)).toBe('0123');
  });

  test('collection is empty', () => {
    expect(reduce([], (acc, n) => acc + n, 0)).toBe(0);
    expect(reduce({}, (acc, n) => acc + n, 0)).toBe(0);
  });

  test('collection contains single element', () => {
    expect(reduce([1], (acc, n) => acc + n, 0)).toBe(1);
    expect(reduce({'a': 1}, (acc, val, key) => acc + val + key,'')).toBe('1a');
  });

  test('collection is non-iterable', () => {
    expect(reduce(123, (acc, n) => acc + n, 0)).toBe(0);
    expect(reduce(true, (acc, n) => acc + n, 0)).toBe(0);
  });

  test('collection is null', () => {
    expect(reduce(null, (acc, n) => acc + n, 0)).toBe(0);
  });

  test('collection is undefined', () => {
    expect(reduce(undefined, (acc, n) => acc + n, 0)).toBe(0);
  });

  test('collection is NaN', () => {
    expect(reduce(NaN, (acc, n) => acc + n, 0)).toBe(0);
  });

  test('accumulator is an array', () => {
    expect(reduce([1, 2, 3], (acc, n) => [...acc, n], [])).toHaveLength(3).toEqual([1, 2, 3]);
    expect(reduce([], (acc, n) => [...acc, n], [])).toBeEmpty();
  });

  test('accumulator is an object', () => {
    expect(reduce({'a': 1, 'b': 2, 'c': 3}, (acc, val, key) => { acc[key] = val; return acc; }, {})).toEqual({'a': 1, 'b': 2, 'c': 3});
    expect(reduce({}, (acc, n) => { acc[n] = n; return acc; }, {})).toBeEmpty();
  });

  test('accumulator is null', () => {
    expect(reduce([1, 2, 3], (acc, n) => acc + n, null)).toBe(6);
    expect(reduce([], (acc, n) => acc + n, null)).toBeNull();
  });

  test('accumulator is undefined', () => {
    expect(reduce([1, 2, 3], (acc, n) => acc + n, undefined)).toBeNaN();
    expect(reduce([], (acc, n) => acc + n, undefined)).toBeUndefined();
  });

  test('accumulator is NaN', () => {
    expect(reduce([1, 2, 3], (acc, n) => acc + n, NaN)).toBeNaN();
    expect(reduce([], (acc, n) => acc + n, NaN)).toBeNaN();
  });

  test('accumulator is omitted', () => {
    expect(reduce([1, 2, 3], (acc, n) => acc + n)).toBe(6);
    expect(reduce([], (acc, n) => acc + n)).toBeUndefined();
  });

  test.failing('function and accumulator are omitted', () => {
    expect(() => reduce([1, 2, 3])).toThrow(TypeError);
    expect(() => reduce([])).toThrow(TypeError);
  });

  test('equal to built-in', () => {
    expect(reduce([1, 2, 3], (acc, n) => acc + n, 0)).toEqual([1, 2, 3].reduce((acc, n) => acc + n, 0));
    expect(reduce([], (acc, n) => acc + n, 0)).toEqual([].reduce((acc, n) => acc + n, 0));
  });
});
