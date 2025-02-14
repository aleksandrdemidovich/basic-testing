// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 3, action: '%', expected: null },
  { a: 2, b: '3', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform %p operation correctly',
    ({ action, a, b, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
