import Duration from './Duration';

export default function sleep(duration: Duration): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration.toMillis()));
}
