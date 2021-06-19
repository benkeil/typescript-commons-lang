import TemporalUnit from './TemporalUnit';
import Duration from '../Duration';
import TimeConstants from '../TimeConstants';

export enum Unit {
  NANOS = 'nanos',
  MICROS = 'micros',
  MILLIS = 'millis',
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  YEARS = 'years',
}

export default class ChronoUnit implements TemporalUnit {
  public static NANOS = new ChronoUnit(Unit.NANOS, Duration.ofNanos(1));
  public static MILLIS = new ChronoUnit(Unit.MILLIS, Duration.ofMillis(1));
  public static SECONDS = new ChronoUnit(Unit.SECONDS, Duration.ofSeconds(1));
  public static MINUTES = new ChronoUnit(Unit.MINUTES, Duration.ofMinutes(1));
  public static HOURS = new ChronoUnit(Unit.HOURS, Duration.ofHours(1));
  public static DAYS = new ChronoUnit(Unit.DAYS, Duration.ofDays(1));
  public static WEEKS = new ChronoUnit(Unit.WEEKS, Duration.ofSeconds(TimeConstants.SECONDS_PER_WEEK));
  public static MONTHS = new ChronoUnit(Unit.MONTHS, Duration.ofSeconds(TimeConstants.SECONDS_PER_MONTH));
  public static YEARS = new ChronoUnit(Unit.YEARS, Duration.ofSeconds(TimeConstants.SECONDS_PER_YEAR));

  constructor(public readonly unit: Unit, public readonly duration: Duration) {}

  isDurationEstimated(): boolean {
    return this.duration.compare(ChronoUnit.DAYS.duration) >= 0;
  }
}
