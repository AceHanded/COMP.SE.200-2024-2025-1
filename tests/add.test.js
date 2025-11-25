/* add.test.js */

import add from '../src/add.js';

describe('add: tests based on phase 1 test plan', () => {
  test('Addition of a positive and a negative number ', () => {
    expect(add(3,-1)).toBe(3-1);
    expect(add(-1,3)).toBe(-1+3);
    expect(add(-5,2)).toBe(-5+2);
  });

  test('Addition of a number with itself', () => {
    expect(add(3,3)).toBe(3+3);
    expect(add(-1,-1)).toBe(-1-1);
  });

  test('Addition includes zero (0)', () => {
    expect(add(-1,0)).toBe(-1);
    expect(add(0,3)).toBe(3);
    expect(add(0,0)).toBe(0);
  });
  
  test.failing('Addition includes non-number variable', () => {
    expect(add(3,"test")).toThrow(TypeError);
    expect(add(false,-1)).toThrow(TypeError);
    expect(add(null,0)).toThrow(TypeError);
    expect(add(true,"test")).toThrow(TypeError);
    expect(add([3,"test"], 0)).toThrow(TypeError);
  });
  
  test('Undefined parameters default to zero (0)', () => {
    expect(add(3,)).toBe(3);
    expect(add(undefined,-1)).toBe(-1);
    expect(add()).toBe(0);
  });
  
});

describe('add: tests NOT based on phase 1 test plan', () => {
  test('Addition includes non-integer numbers', () => {
    expect(add(2.51, 3)).toBe(2.51+3);
    expect(add(-0.9, 0.9)).toBe(-0.9+0.9);
    expect(add(-0.14, 0.13)).toBe(-0.14+0.13)
  });

  test('Addition includes non-standard number values', () => {
    expect(add(Infinity, -2)).toBe(Infinity-2);
    expect(add(-1, NaN)).toBe(NaN);
    expect(add(Number.MIN_VALUE, Number.MAX_VALUE)).toBe(Number.MIN_VALUE+Number.MAX_VALUE)
  });
});

/*
describe('add: AI-assisted tests (using MS Copilot)', () => {
  test('placeholder', () => {
    expect(true).toBe(true);
  });
});
*/