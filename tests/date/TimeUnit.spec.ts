import TimeUnit from '../../src/date/TimeUnit';

describe('TimeUnit', () => {
  describe('minutes', () => {
    test('toMillis', () => {
      expect(TimeUnit.minutes(2).toMillis()).toBe(1000 * 60 * 2);
    });
  });
  describe('hours', () => {
    test('toDays', () => {
      expect(TimeUnit.hours(6).toDays()).toBe(0.25);
    });
  });
  describe('days', () => {
    test('toSeconds', () => {
      expect(TimeUnit.days(2).toSeconds()).toBe(2 * 24 * 60 * 60);
    });
    test('toMillis', () => {
      expect(TimeUnit.days(2).toMillis()).toBe(2 * 24 * 60 * 60 * 1000);
    });
  });
  test('parse', () => {
    expect(TimeUnit.parse('10min').toSeconds()).toBe(10 * 60);
  });
});
