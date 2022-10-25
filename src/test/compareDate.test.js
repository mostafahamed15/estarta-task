import { compareDate, compareDateTime } from '../helper/compareDate';

test('compare date, if 2021-11-25 bigger than 2021-11-24', () => {
  expect(compareDate('2021-11-24', '2021-11-25')).toBeTruthy();
});

test('compare datetime, if 2021-11-25 17:23:06 bigger than 2021-11-25 18:28:37', () => {
  expect(
    compareDateTime('2021-11-25 17:23:06', '2021-11-25 18:28:37')
  ).toBeTruthy();
});
