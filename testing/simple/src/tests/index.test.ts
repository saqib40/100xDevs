import {describe, expect, test} from '@jest/globals';
import {sum, multiply} from '../index';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  test('add negatives', () => {
    expect(sum(-1,-3)).toBe(-4);
  })
});

describe('multiply module', () => {
  test('multiply negatives', () => {
    expect(multiply(-1,-3)).toBe(3);
  })
});