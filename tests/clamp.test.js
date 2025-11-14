/* clamp.test.js */

import clamp from '../src/clamp.js';

describe('clamp', () => {
  test('number is within the range', () => {
    expect(clamp(-7, -5, -10)).toBe(-7);
    expect(clamp(7, 5, 10)).toBe(7);
  });

  test('number is outside the range', () => {
    expect(clamp(-11, -10, -5)).toBe(-10);
    expect(clamp(-1, -10, -5)).toBe(-5);
    expect(clamp(1, 5, 10)).toBe(5);
    expect(clamp(11, 5, 10)).toBe(10);
  });

  test('number is on the edge of the range', () => {
    expect(clamp(-10, -10, -5)).toBe(-10);
    expect(clamp(-5, -10, -5)).toBe(-5);
    expect(clamp(5, 5, 10)).toBe(5);
    expect(clamp(10, 5, 10)).toBe(10);
  });

  test('bounds are the wrong way around', () => {
    expect(clamp(-7, -5, -10)).toBe(-7);
    expect(clamp(7, 10, 5)).toBe(7);
  });

  test('number is NaN', () => {
    expect(clamp(NaN, 5, 10)).toBeNaN();
  });

  test('bounds are NaN', () => {
    expect(clamp(-5, NaN, 5)).toBe(0);
    expect(clamp(5, -5, NaN)).toBe(0);
  });

  test('number is null', () => {
    expect(clamp(null, -5, 5)).toBe(0);
    expect(clamp(null, 5, 10)).toBe(5);
    expect(clamp(null, 0, 5)).toBe(0);
  });

  test('bounds are null', () => {
    expect(clamp(-5, null, 5)).toBe(0);
    expect(clamp(5, -5, null)).toBe(0);
  });

  test('number is undefined', () => {
    expect(clamp(undefined, 5, 10)).toBeNaN();
  });

  test('bounds are undefined', () => {
    expect(clamp(-5, undefined, 5)).toBe(0);
    expect(clamp(5, -5, undefined)).toBe(0);
  });

  test('number is float', () => {
    expect(clamp(-0.5, -5, 0)).toBe(-0.5);
    expect(clamp(-0.5, -10, -5)).toBe(-5);
    expect(clamp(-0.5, -5, -0.5)).toBe(-0.5);
    expect(clamp(0.5, 0, 5)).toBe(0.5);
    expect(clamp(0.5, 5, 10)).toBe(5);
    expect(clamp(0.5, 0.5, 5)).toBe(0.5);
  });

  test('bounds are floats', () => {
    expect(clamp(-5, -0.5, 5)).toBe(-0.5);
    expect(clamp(5, -5, -0.5)).toBe(-0.5);
    expect(clamp(-5, 0.5, 5)).toBe(0.5);
    expect(clamp(5, -5, 0.5)).toBe(0.5);
  });

  test('number is boolean', () => {
    expect(clamp(false, -5, 5)).toBe(0);
    expect(clamp(false, 5, 10)).toBe(5);
    expect(clamp(false, 0, 5)).toBe(0);
    expect(clamp(true, -5, 5)).toBe(1);
    expect(clamp(true, 5, 10)).toBe(5);
    expect(clamp(true, 1, 5)).toBe(1);
  });

  test('bounds are booleans', () => {
    expect(clamp(-5, false, 5)).toBe(0);
    expect(clamp(5, -5, false)).toBe(0);
    expect(clamp(-5, true, 5)).toBe(1);
    expect(clamp(5, -5, true)).toBe(1);
  });

  test('number is infinity', () => {
    expect(clamp(-Infinity, 5, 10)).toBe(5);
    expect(clamp(Infinity, 5, 10)).toBe(10);
  });

  test('bounds are infinity', () => {
    expect(clamp(-5, -Infinity, 5)).toBe(-5);
    expect(clamp(5, -5, Infinity)).toBe(5);
  });

  test('number is string', () => {
    expect(clamp('', -5, 5)).toBe(0);
    expect(clamp('', 5, 10)).toBe(5);
    expect(clamp('', 0, 5)).toBe(0);
    expect(clamp('1', -5, 5)).toBe(1);
    expect(clamp('1', 5, 10)).toBe(5);
    expect(clamp('1', 1, 5)).toBe(1);
    expect(clamp('abc', 5, 10)).toBeNaN();
  });

  test('bounds are strings', () => {
    expect(clamp(-5, '', 5)).toBe(0);
    expect(clamp(5, -5, '')).toBe(0);
    expect(clamp(-5, '1', 5)).toBe(1);
    expect(clamp(5, -5, '1')).toBe(1);
    expect(clamp(-5, 'abc', 5)).toBe(0);
    expect(clamp(5, -5, 'abc')).toBe(0);
  });
});
