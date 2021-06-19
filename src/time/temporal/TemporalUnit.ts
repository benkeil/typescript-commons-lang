import Duration from '../Duration';

export default interface TemporalUnit {
  duration: Duration;
  isDurationEstimated(): boolean;
}
