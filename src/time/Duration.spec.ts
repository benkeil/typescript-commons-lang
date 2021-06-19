import Duration from './Duration';
import ChronoUnit from './temporal/ChronoUnit';

describe('Duration', () => {
  test('to...', () => {
    const minutes = ChronoUnit.MINUTES;
    console.log(minutes);
    const twoMinutes = Duration.ofMinutes(2);
    console.log(twoMinutes);
    // expect(twoMinutes.toNanos()).toBe(1000 * 60 * 2);
    // expect(twoMinutes.toMillis()).toBe(1000 * 60 * 2);
    // expect(twoMinutes.toSeconds()).toBe(1000 * 60 * 2);
  });
});
