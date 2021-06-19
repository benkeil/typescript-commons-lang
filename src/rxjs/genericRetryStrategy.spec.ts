import { interval } from 'rxjs';
import { map, retryWhen } from 'rxjs/operators';
import genericRetryStrategy from './genericRetryStrategy';
import RuntimeError from '../error/RuntimeError';
import { isErrorConstructorOf } from '../types/utility';
import { performance } from 'perf_hooks';
import Duration from '../time/Duration';

class ValueToHighError extends RuntimeError {
  constructor(value: number) {
    super({ message: `Value ${value} is to high.`, type: 'value_to_high' });
  }
}

describe('genericRetryStrategy', () => {
  test(
    'works',
    (done) => {
      const source = interval(500);
      const startAt = performance.now();
      const example = source.pipe(
        map((value) => {
          if (value > 2) {
            // error will be picked up by retryWhen
            throw new Error(`Value ${value} is to high.`);
          }
          console.log('value', value);
          return value;
        }),
        retryWhen(genericRetryStrategy({ maxRetryAttempts: 1 })),
      );
      example.subscribe({
        error: (err) => {
          const endAt = performance.now();
          expect(err.constructor).toBe(Error);
          expect(endAt - startAt).toBeLessThanOrEqual(5500);
          done();
        },
      });
    },
    Duration.ofSeconds(10).toMillis(),
  );

  test(
    'excludeErrorFunctions',
    (done) => {
      const source = interval(500);
      const startAt = performance.now();
      const example = source.pipe(
        map((value) => {
          if (value > 2) {
            // error will be picked up by retryWhen
            throw new ValueToHighError(value);
          }
          console.log('value', value);
          return value;
        }),
        retryWhen(genericRetryStrategy({ excludeErrorFunctions: [(error): boolean => error.constructor === ValueToHighError] })),
      );
      example.subscribe({
        error: (err) => {
          const endAt = performance.now();
          expect(err.constructor).toBe(ValueToHighError);
          expect(endAt - startAt).toBeLessThanOrEqual(2500);
          done();
        },
      });
    },
    Duration.ofSeconds(10).toMillis(),
  );

  test(
    'isErrorConstructor',
    (done) => {
      const source = interval(500);
      const startAt = performance.now();
      const example = source.pipe(
        map((value) => {
          if (value > 2) {
            // error will be picked up by retryWhen
            throw new ValueToHighError(value);
          }
          console.log('value', value);
          return value;
        }),
        retryWhen(genericRetryStrategy({ excludeErrorFunctions: [isErrorConstructorOf(ValueToHighError)] })),
      );
      example.subscribe({
        error: (err) => {
          const endAt = performance.now();
          expect(err.constructor).toBe(ValueToHighError);
          expect(endAt - startAt).toBeLessThanOrEqual(2500);
          done();
        },
      });
    },
    Duration.ofSeconds(10).toMillis(),
  );

  test(
    'isErrorConstructor Error',
    (done) => {
      const source = interval(500);
      const startAt = performance.now();
      const example = source.pipe(
        map((value) => {
          if (value > 2) {
            // error will be picked up by retryWhen
            throw new Error(`Value ${value} is to high.`);
          }
          console.log('value', value);
          return value;
        }),
        retryWhen(genericRetryStrategy({ excludeErrorFunctions: [isErrorConstructorOf(Error)] })),
      );
      example.subscribe({
        error: (err) => {
          const endAt = performance.now();
          expect(err.constructor).toBe(Error);
          expect(endAt - startAt).toBeLessThanOrEqual(2500);
          done();
        },
      });
    },
    Duration.ofSeconds(10).toMillis(),
  );
});
