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
    expect(add(3,"test")).toBe(NaN);
    expect(add(false,-1)).toBe(NaN);
    expect(add(null,0)).toBe(NaN);
    expect(add(true,"test")).toBe(NaN);
    expect(add([3,"test"], 0)).toBe(NaN);
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
    expect(add(-0.14, 0.13)).toBe(-0.14+0.13);
  });

  test('Addition includes non-standard number values', () => {
    expect(add(Infinity, -2)).toBe(Infinity-2);
    expect(add(-1, NaN)).toBe(NaN);
    expect(add(Number.MIN_VALUE, Number.MAX_VALUE)).toBe(Number.MIN_VALUE+Number.MAX_VALUE);
  });
});

describe('add: AI-generated tests (using MS Copilot)', () => {
  
  test('adds two positive integers', () => {
    expect(add(6, 4)).toBe(10)
  })

  test('handles negative numbers', () => {
    expect(add(-3, 7)).toBe(4)
    expect(add(-5, -5)).toBe(-10)
  })

  test('adds floating point numbers (exact cases)', () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75, 12)
  })

  test.failing('coerces numeric strings to numbers', () => {
    expect(add('5', '7')).toBe(12)
    expect(add(' 10 ', 5)).toBe(15)
  })

  test('coerces booleans & null', () => {
    expect(add(true, 2)).toBe(3)
    expect(add(false, 2)).toBe(2)
    expect(add(null, 2)).toBe(2)
  })

  test('uses identity 0 when both args are undefined', () => {
    expect(add(undefined, undefined)).toBe(0)
  })

  test('returns the defined argument when the other is undefined', () => {
    expect(add(undefined, 5)).toBe(5)
    expect(add(5, undefined)).toBe(5)
  })

  test.failing('propagates NaN when any operand is NaN after coercion', () => {
    expect(Number.isNaN(add(NaN, 5))).toBe(true)
    expect(Number.isNaN(add('foo', 1))).toBe(true)
    expect(Number.isNaN(add({}, 1))).toBe(true)
  })

  test('handles Infinity correctly', () => {
    expect(add(Infinity, 1)).toBe(Infinity)
    expect(add(-Infinity, 1)).toBe(-Infinity)
  })

  test('coerces boxed numbers via valueOf', () => {
    expect(add(Object(3), 4)).toBe(7)
  })
  test('uses toBeCloseTo for floating prices', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 12)
    expect(add(19.99, 0.01)).toBeCloseTo(20.0, 12)
  })

  test('integer-cents approach for currency sums', () => {
    const toCents = (v) => Math.round(v * 100)
    const fromCents = (c) => c / 100

    const subtotalCents = add(toCents(19.99), toCents(0.01))
    expect(subtotalCents).toBe(2000)
    expect(fromCents(subtotalCents)).toBe(20)
  })

  test('works as reducer with explicit initial value', () => {
    const nums = [1, 2, 3, 4]
    const sum = nums.reduce(add, 0)
    expect(sum).toBe(10)
  })

  test('sums cart totals in cents exactly', () => {
    const toCents = (v) => Math.round(v * 100)
    const cart = [
      { price: 12.99, qty: 2 },
      { price: 5.5,   qty: 1 },
      { price: 0.99,  qty: 3 },
    ]
    const totalCents = cart
      .map(i => toCents(i.price) * i.qty)
      .reduce(add, 0)
    expect(totalCents).toBe(3445)
  })

  test('identity and commutativity (sampled)', () => {
    expect(add(10, 0)).toBe(10)
    expect(add(0, 10)).toBe(10)

    const pairs = [
      [1, 2],
      [1.5, 2.25],
      [-3, 7],
      [1000, 2000],
    ]
    for (const [a, b] of pairs) {
      expect(add(a, b)).toBe(add(b, a))
    }
  })

  test('does not mutate inputs', () => {
    const a = 5
    const b = 2
    add(a, b)
    expect(a).toBe(5)
    expect(b).toBe(2)
  })

});
