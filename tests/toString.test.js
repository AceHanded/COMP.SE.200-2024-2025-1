/* toString.test.js */

import toString from '../src/toString.js';

describe('toString', () => {
  test('value is a string', () => {
    expect(toString('')).toBe('');
    expect(toString('123')).toBe('123');
    expect(toString('abc')).toBe('abc');
  });

  test('value is a symbol', () => {
    const symbol = Symbol('x'), symbolObject = Object(Symbol('x'));

    expect(toString(symbol)).toBe(symbol.toString());
    expect(toString(symbolObject)).toBe(symbolObject.toString());
  });

  test('value is an integer', () => {
    expect(toString(0)).toBe('0');
    expect(toString(-0)).toBe('-0');
    expect(toString(123)).toBe('123');
    expect(toString(-123)).toBe('-123');
  });
  
  test('value is NaN', () => {
    expect(toString(NaN)).toBe('NaN');
  });

  test('value is null', () => {
    expect(toString(null)).toBe('null');
  });

  test('value is undefined', () => {
    expect(toString(undefined)).toBe('undefined');
  });

  test.failing('value is float', () => {
    expect(toString(0.0)).toBe('0.0');
    expect(toString(-0.0)).toBe('-0.0');
    expect(toString(0.5)).toBe('0.5');
    expect(toString(-0.5)).toBe('-0.5');
  });

  test('value is boolean', () => {
    expect(toString(false)).toBe('false');
    expect(toString(true)).toBe('true');
  });

  test('value is infinity', () => {
    expect(toString(Infinity)).toBe('Infinity');
    expect(toString(-Infinity)).toBe('-Infinity');
  });

  test.failing('value is an array', () => {
    const symbol = Symbol('x'), symbol2 = Symbol('y'), symbol3 = Symbol('z');
    
    expect(toString([])).toBe('');
    expect(toString(['a', 'b', 'c'])).toBe('a,b,c');
    expect(toString([symbol, symbol2, symbol3])).toBe(`${symbol.toString()},${symbol2.toString()},${symbol3.toString()}`);
    expect(toString([1, 2, 3])).toBe('1,2,3');
    expect(toString([NaN, NaN, NaN])).toBe('NaN,NaN,NaN');
    expect(toString([null, null, null])).toBe(',,');
    expect(toString([undefined, undefined, undefined])).toBe('undefined,undefined,undefined');
    expect(toString([0.0, 0.5, 1.0])).toBe('0.0,0.5,1.0');
    expect(toString([false, true, false])).toBe('false,true,false');
    expect(toString([-Infinity, Infinity, Infinity])).toBe('-Infinity,Infinity,Infinity');
  });

  test('value is an object', () => {
    expect(toString({})).toBe('[object Object]');
    expect(toString({'a': 1, 'b': 2, 'c': 3})).toBe('[object Object]');
  });
});
