/* divide.test.js */

import divide from '../src/divide.js';

describe('divide', () => {
  test.failing('Division of two numbers', () => {
    expect(divide(1,2)).toBe(1/2);
    expect(divide(-4,-2)).toBe(-4/-2)
    expect(divide(-2.4,2.4)).toBe(-2.4/2.4)
  });

  test('Division of number with itself', () => {
    expect(divide(4,4)).toBe(1);
    expect(divide(-2.52,-2.52)).toBe(1);
  });

  test.failing('Dividend is zero (0)', () => {
    expect(divide(0,2)).toBe(0/2);
  });

  test.failing('Divisor is zero (0)', () => {
    expect(divide(2,0)).toThrow(RangeError);
  });

  test.failing('Undefined parameters default to one (1)', () => {
    expect(divide(2,)).toBe(2/1);
    expect(divide(undefined,2)).toBe(1/2);
    expect(divide()).toBe(1/1);
  });

  test.failing('Division includes infinity', () => {
    expect(divide(Infinity,2)).toBe(Infinity);
    expect(divide(2,Infinity)).toBe(2/Infinity);
  });

  test.failing('Division includes very large and very small numbers', () => {
    expect(divide(Number.MAX_VALUE,2)).toBe(Number.MAX_VALUE/2);
    expect(divide(2,Number.MIN_VALUE)).toBe(2/Number.MIN_VALUE);
    expect(divide(Number.MIN_VALUE,Number.MAX_VALUE)).toBe(Number.MIN_VALUE/Number.MAX_VALUE);
  });

  test.failing('Division includes String', () => {
    expect(divide("test",2)).toThrow(TypeError);
    expect(divide(2,"test")).toThrow(TypeError);
    expect(divide("2", "4")).toThrow(TypeError);
  });

  test.failing('Division includes bool', () => {
    expect(divide(true,2)).toThrow(TypeError);
    expect(divide(2,false)).toThrow(TypeError);
  });

  test.failing('Division includes object', () => {
    expect(divide([2,1],2)).toThrow(TypeError);
    expect(divide(2,{test: 2})).toThrow(TypeError);
  });

});
