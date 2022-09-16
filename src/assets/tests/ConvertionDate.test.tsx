import { convertDate, convertTime } from '../services/convertionDate';

import { describe, expect, test } from 'vitest';

describe('Convertion Date test', () => {
  test('Convert Day ', () => {
    const weekDay = convertDate('2022-09-15', { weekday: 'long' });
    expect(weekDay).toBe('jeudi');
  });
  test('Convert month ', () => {
    const month = convertDate('2022-09-15', { month: 'long' });
    expect(month).toBe('septembre');
  });
  test('Convert Day ', () => {
    const day = convertDate('2022-09-15', { day: 'numeric' });
    expect(day).toBe('15');
  });
});
describe('Convertion Date time', () => {
  test('Convert Time ', () => {
    const time = convertTime('2022-09-02T12:20:00.000+00:00', {
      hour: '2-digit',
      minute: '2-digit',
    });
    expect(time).toBe('12:20');
  });
});
