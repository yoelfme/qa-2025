import { expect, test } from 'vitest'
import { sum } from '../src/index.js'

test('adds 1 + 2 to equal 3', () => {
    // Given two numbers
    const a = 1;
    const b = 2;

    // When we sum them
    const result = sum(a, b);

    // Then the result should be the sum of the two numbers
    expect(result).toBe(3);
})