export default class TimeConstants {
  public static NANOS_PER_SECOND = 1_000_000_000;
  public static SECONDS_PER_MINUTE = 60;
  public static SECONDS_PER_HOUR = 60 * TimeConstants.SECONDS_PER_MINUTE;
  public static SECONDS_PER_DAY = 24 * TimeConstants.SECONDS_PER_HOUR;
  public static SECONDS_PER_WEEK = 7 * TimeConstants.SECONDS_PER_DAY;
  public static SECONDS_PER_YEAR = 31556952;
  public static SECONDS_PER_MONTH = TimeConstants.SECONDS_PER_YEAR / 12;
  public static MINUTES_PER_HOUR = 60;
  public static HOURS_PER_DAY = 24;
}
