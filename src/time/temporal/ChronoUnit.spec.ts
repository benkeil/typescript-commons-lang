import ChronoUnit, { Unit } from './ChronoUnit';
import Duration from '../Duration';

describe('ChronoUnit', () => {
  test('constructor', () => {
    const chronoUnit = new ChronoUnit(Unit.DAYS, Duration.ofNanos(3));
    console.log(chronoUnit);
    console.log(ChronoUnit.MINUTES);
    console.log(ChronoUnit.NANOS);
  });
});
