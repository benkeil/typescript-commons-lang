enum TimeUnits {
  NANO = 1,
  MICRO = NANO * 1000,
  MILLIS = MICRO * 1000,
  SECONDS = MILLIS * 1000,
  MINUTES = SECONDS * 60,
  HOURS = MINUTES * 60,
  DAYS = HOURS * 24,
}

export default class TimeUnit {

  private static readonly PARSE_REGEX = /^\s*(\d*(?:[.,]\d*)?)\s*(\w+)\s*$/;

  public static SUFFIX_UNIT_MAP = new Map<string, TimeUnits>([
    ['ns', TimeUnits.NANO],
    ['us', TimeUnits.MICRO],
    ['ms', TimeUnits.MILLIS],
    ['s', TimeUnits.SECONDS],
    ['sec', TimeUnits.SECONDS],
    ['second', TimeUnits.SECONDS],
    ['seconds', TimeUnits.SECONDS],
    ['m', TimeUnits.MINUTES],
    ['min', TimeUnits.MINUTES],
    ['minute', TimeUnits.MINUTES],
    ['minutes', TimeUnits.MINUTES],
    ['h', TimeUnits.HOURS],
    ['hour', TimeUnits.HOURS],
    ['hours', TimeUnits.HOURS],
    ['d', TimeUnits.DAYS],
    ['day', TimeUnits.DAYS],
    ['days', TimeUnits.DAYS],
  ]);

  private constructor(
      private readonly value: number,
      private readonly unit: TimeUnits,
  ) {
  }

  public static nanoSeconds(value: number): TimeUnit {
    return new TimeUnit(value, TimeUnits.NANO);
  }

  public static microSeconds(value: number): TimeUnit {
    return new TimeUnit(value, TimeUnits.MICRO);
  }

  public static milliSeconds(value: number): TimeUnit {
    return new TimeUnit(value, TimeUnits.MILLIS);
  }

  public static seconds(value: number): TimeUnit {
    return new TimeUnit(value, TimeUnits.SECONDS);
  }

  public static minutes(value: number): TimeUnit {
    return new TimeUnit(value, TimeUnits.MINUTES);
  }

  public static hours(value: number): TimeUnit {
    return new TimeUnit(value, TimeUnits.HOURS);
  }

  public static days(value: number): TimeUnit {
    return new TimeUnit(value, TimeUnits.DAYS);
  }

  toNanos(): number {
    return this.calculate(TimeUnits.NANO);
  }

  toMicros(): number {
    return this.calculate(TimeUnits.MICRO);
  }

  toMillis(): number {
    return this.calculate(TimeUnits.MILLIS);
  }

  toSeconds(): number {
    return this.calculate(TimeUnits.SECONDS);
  }

  toMinutes(): number {
    return this.calculate(TimeUnits.MINUTES);
  }

  toHours(): number {
    return this.calculate(TimeUnits.HOURS);
  }

  toDays(): number {
    return this.calculate(TimeUnits.DAYS);
  }

  private calculate(unit): number {
    return (this.value * this.unit) / unit;
  }

  static parse(str: string): TimeUnit {
    const results = TimeUnit.PARSE_REGEX.exec(str);

    if (!results) {
      throw new Error(`invalid string: ${ str }`);
    }

    const value = Number(results[1]);

    const unit = TimeUnit.SUFFIX_UNIT_MAP.get(results[2]);

    if (!unit) {
      throw new Error(`invalid string: ${ str }`);
    }

    return new TimeUnit(value, unit);
  }

}
