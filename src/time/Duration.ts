import TemporalUnit from './temporal/TemporalUnit';
import experimental from '../decorator/experimental';
import TimeConstants from './TimeConstants';
import final from '../decorator/final';
import { Comparable, compare } from '../types/utility';
import RuntimeError from '../error/RuntimeError';

@experimental()
@final()
export default class Duration implements Comparable<Duration> {
  public static ZERO = new Duration(0, 0);

  protected constructor(protected readonly seconds: number, protected readonly nanos: number) {}

  public static of(amount: number, unit: TemporalUnit): Duration {
    return this.ZERO.plusUnit(amount, unit);
  }

  public static ofNanos(nanos: number): Duration {
    const secs = nanos / TimeConstants.NANOS_PER_SECOND;
    const nos = nanos % TimeConstants.NANOS_PER_SECOND;
    if (nos < 0) {
      return new Duration(secs - 1, nos + TimeConstants.NANOS_PER_SECOND);
    }
    return new Duration(secs, nos);
  }

  public static ofMillis(millis: number): Duration {
    const secs = millis / 1000;
    const mos = millis % 1000;
    if (mos < 0) {
      return new Duration(secs - 1, mos + 1000);
    }
    return new Duration(secs, mos);
  }

  public static ofSeconds(seconds: number, nanos: number = 0): Duration {
    return new Duration(seconds, nanos);
  }

  public static ofMinutes(minutes: number): Duration {
    return new Duration(minutes * TimeConstants.SECONDS_PER_MINUTE, 0);
  }

  public static ofHours(hours: number): Duration {
    return new Duration(hours * TimeConstants.SECONDS_PER_HOUR, 0);
  }

  public static ofDays(days: number): Duration {
    return new Duration(days * TimeConstants.SECONDS_PER_DAY, 0);
  }

  public plus(duration: Duration): Duration {
    return this.plusSecondsAndNanos(duration.seconds, duration.nanos);
  }

  public plusUnit(amountToAdd: number, unit: TemporalUnit): Duration {
    if (amountToAdd === 0) {
      return this;
    }
    if (unit.isDurationEstimated()) {
      throw new RuntimeError({ message: 'Could not add estimated durations', type: 'invalid_value' });
    }
    // if (unit instanceof ChronoUnit) {
    //   console.log('+ instanceof');
    //   switch ((unit as ChronoUnit).unit) {
    //     case Unit.NANOS:
    //       return this.plusNanos(amountToAdd);
    //     case Unit.MICROS:
    //       return this.plusMicros(amountToAdd);
    //     case Unit.MILLIS:
    //       return this.plusMillis(amountToAdd);
    //     case Unit.SECONDS:
    //       return this.plusSeconds(amountToAdd);
    //     case Unit.MINUTES:
    //       return this.plusMinutes(amountToAdd);
    //     case Unit.HOURS:
    //       return this.plusHours(amountToAdd);
    //     case Unit.DAYS:
    //       return this.plusDays(amountToAdd);
    //   }
    //   return this.plusSeconds(amountToAdd * unit.duration.seconds);
    // }
    const duration: Duration = unit.duration.multipliedBy(amountToAdd);
    return this.plusSeconds(duration.seconds).plusNanos(duration.nanos);
  }

  public plusNanos(nanosToAdd: number): Duration {
    return this.plusSecondsAndNanos(0, nanosToAdd);
  }

  public plusMicros(microsToAdd: number): Duration {
    const secondsToAdd = (microsToAdd / (TimeConstants.NANOS_PER_SECOND * 1000)) * 1000;
    const nanosToAdd = (microsToAdd % (TimeConstants.NANOS_PER_SECOND * 1000)) * 1000;
    return this.plusSeconds(secondsToAdd).plusNanos(nanosToAdd);
  }

  public plusMillis(millisToAdd: number): Duration {
    return this.plusSecondsAndNanos(millisToAdd / 1000, (millisToAdd % 1000) * TimeConstants.NANOS_PER_SECOND);
  }

  public plusSeconds(secondsToAdd: number): Duration {
    return this.plusSecondsAndNanos(secondsToAdd, 0);
  }

  public plusMinutes(minutesToAdd: number): Duration {
    return this.plusSecondsAndNanos(minutesToAdd * TimeConstants.SECONDS_PER_MINUTE, 0);
  }

  public plusHours(hoursToAdd: number): Duration {
    return this.plusSecondsAndNanos(hoursToAdd * TimeConstants.SECONDS_PER_HOUR, 0);
  }

  public plusDays(daysToAdd: number): Duration {
    return this.plusSecondsAndNanos(daysToAdd * TimeConstants.SECONDS_PER_DAY, 0);
  }

  private plusSecondsAndNanos(secondsToAdd: number, nanosToAdd: number): Duration {
    if ((secondsToAdd | nanosToAdd) === 0) {
      return this;
    }
    const epochSec = this.seconds + secondsToAdd + nanosToAdd / TimeConstants.NANOS_PER_SECOND;
    const nanoAdjustment = this.nanos + (nanosToAdd % TimeConstants.NANOS_PER_SECOND);
    return Duration.ofSeconds(epochSec, nanoAdjustment);
  }

  public multipliedBy(multiplicand: number): Duration {
    if (multiplicand === 0) {
      return Duration.ZERO;
    }
    if (multiplicand === 1) {
      return this;
    }
    return new Duration(this.seconds * multiplicand, 0);
  }

  public toNanos(): number {
    return this.seconds * TimeConstants.NANOS_PER_SECOND + this.nanos;
  }

  public toNanosPart(): number {
    return this.seconds;
  }

  public toMillis(): number {
    return this.seconds * 1000 + this.nanos / TimeConstants.NANOS_PER_SECOND;
  }

  public toMillisPart(): number {
    return this.nanos / TimeConstants.NANOS_PER_SECOND;
  }

  public toSeconds(): number {
    return this.seconds;
  }

  public toSecondsPart(): number {
    return this.toSeconds() & TimeConstants.SECONDS_PER_MINUTE;
  }

  public toMinutes(): number {
    return this.seconds / TimeConstants.SECONDS_PER_MINUTE;
  }

  public toMinutesPart(): number {
    return this.toMinutes() % TimeConstants.MINUTES_PER_HOUR;
  }

  public toHours(): number {
    return this.seconds / TimeConstants.SECONDS_PER_HOUR;
  }

  public toHoursPart(): number {
    return this.toHours() % TimeConstants.HOURS_PER_DAY;
  }

  public toDays(): number {
    return this.seconds / TimeConstants.SECONDS_PER_DAY;
  }

  public toDaysPart(): number {
    return this.toDays();
  }

  compare(other: Duration): number {
    const cmp = compare(this.seconds, other.seconds);
    if (cmp != 0) {
      return cmp;
    }
    return this.nanos - other.nanos;
  }
}
