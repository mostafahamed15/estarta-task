import { uniqueArray } from '../helper/uniqueArray';

test('check unique Array method if give unique Array', () => {
  expect(uniqueArray([1, 1, 2, 2, 3, 3, 3, 1, 4])).toEqual([1, 2, 3, 4]);
});

test('check unique Array method', () => {
  expect(uniqueArray([1, 1, 2, 2, 3, 3, 3, 1, 4])).not.toEqual([
    1, 1, 2, 2, 3, 3, 3, 1, 4,
  ]);
});
