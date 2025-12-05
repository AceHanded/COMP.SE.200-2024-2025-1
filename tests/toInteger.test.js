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
    expect(toInteger(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
    expect(toInteger(Infinity)).toBe(Number.MAX_VALUE);
    expect(toInteger(-Infinity)).toBe(-Number.MAX_VALUE);
  });

  test('Value is a valid number with type String', () => {
    expect(toInteger("12.21")).toBe(12);
    expect(toInteger("Infinity")).toBe(Number.MAX_VALUE);
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


describe('toInteger: AI-generated tests (using MS Copilot)', () => {
  
  describe('basic numeric behavior', () => {
    test.each([
      [0, 0, 'zero'],
      [-0, -0, 'negative zero (preserves sign)'],
      [5, 5, 'already integer'],
      [3.2, 3, 'truncates positive decimals'],
      [-3.2, -3, 'truncates negative decimals toward zero'],
      [Number.MIN_VALUE, 0, 'very small becomes 0'],
    ])('(%s) -> %s: %s', (input, expected) => {
      const out = toInteger(input);
      // -0 equality check needs Object.is, because -0 === 0
      if (Object.is(expected, -0)) {
        expect(Object.is(out, -0)).toBe(true);
      } else {
        expect(out).toBe(expected);
      }
    });

    test('Infinity -> Number.MAX_VALUE', () => {
      expect(toInteger(Infinity)).toBe(Number.MAX_VALUE);
    });

    test('-Infinity -> -Number.MAX_VALUE', () => {
      expect(toInteger(-Infinity)).toBe(-Number.MAX_VALUE);
    });

    test('NaN -> 0', () => {
      expect(toInteger(NaN)).toBe(0);
    });
  });

  describe('strings and common e‑commerce inputs', () => {
    test.each([
      ['3.2', 3],
      ['42', 42],
      ['  7.9  ', 7],
      ['-2.5', -2],        // returns are allowed; truncates not rounds
      ['19.99', 19],       // price string -> integer part only (see note below)
      ['0.00', 0],
      ['', 0],             // empty string
      ['   ', 0],          // whitespace
      ['FREE', 0],         // non-numeric text -> fallback zero
    ])('string "%s" -> %s', (input, expected) => {
      expect(toInteger(input)).toBe(expected);
    });
  });

  describe('booleans / null / undefined', () => {
    test.each([
      [true, 1],
      [false, 0],
      [null, 0],
      [undefined, 0],
    ])('%s -> %s', (input, expected) => {
      expect(toInteger(input)).toBe(expected);
    });
  });

  describe('objects with numeric coercion', () => {
    test('object with valueOf()', () => {
      const obj = { valueOf: () => 3.7 };
      expect(toInteger(obj)).toBe(3);
    });

    test('Date -> timestamp truncated', () => {
      const d = new Date(123.75);
      // JS number coercion for Date uses its timestamp
      expect(toInteger(d)).toBe(123);
    });
  });

  describe('large numbers & safety notes', () => {
    test('beyond Number.MAX_SAFE_INTEGER still truncates', () => {
      const n = Number.MAX_SAFE_INTEGER + 5.2;
      // we assert against the truncation formula to avoid precision pitfalls
      expect(toInteger(n)).toBe(n - (n % 1));
    });
  });

});
