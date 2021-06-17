import {
  interval,
} from 'rxjs';
import {
  map,
  retryWhen,
} from 'rxjs/operators';
import Logger from '@trustedshops/etrusted-aaa-library-logging/dist/Logger';
import { LogLevel } from '@trustedshops/etrusted-aaa-library-logging';
import RuntimeError from '@trustedshops/etrusted-aaa-library-core/dist/error/RuntimeError';
import genericRetryStrategy, { isErrorConstructor } from '../../src/rxjs/genericRetryStrategy';

const logger: Logger = {
  addContext(_key: string, _value: any): void {
    // do nothing
  },
  clearContext(): void {
    // do nothing
  },
  debug(message: any, ...params: any[]): void {
    console.log(message, params);
  },
  error(message: any, ...params: any[]): void {
    this.debug(message, params);
  },
  fatal(message: any, ...params: any[]): void {
    this.debug(message, params);
  },
  info(message: any, ...params: any[]): void {
    this.debug(message, params);
  },
  isDebugEnabled(): boolean {
    return false;
  },
  isErrorEnabled(): boolean {
    return false;
  },
  isFatalEnabled(): boolean {
    return false;
  },
  isInfoEnabled(): boolean {
    return false;
  },
  isLevelEnabled(_level: LogLevel): boolean {
    return false;
  },
  isTraceEnabled(): boolean {
    return false;
  },
  isWarnEnabled(): boolean {
    return false;
  },
  removeContext(_key: string): void {
    // do nothing
  },
  trace(message: any, ...params: any[]): void {
    this.debug(message, params);
  },
  warn(message: any, ...params: any[]): void {
    this.debug(message, params);
  },
};

class ValueToHighError extends RuntimeError {

  constructor(value: number) {
    super({ message: `Value ${ value } is to high.`, type: 'value_to_high' });
  }

}

describe('genericRetryStrategy', () => {
  test('works', (done) => {
    const source = interval(500);
    const startAt = performance.now();
    const example = source.pipe(
      map((value) => {
        if (value > 2) {
          // error will be picked up by retryWhen
          throw new Error(`Value ${ value } is to high.`);
        }
        console.log('value', value);
        return value;
      }),
      retryWhen(genericRetryStrategy(logger, { maxRetryAttempts: 1 })),
    );
    example.subscribe({
      error: (err) => {
        const endAt = performance.now();
        expect(err.constructor).toBe(Error);
        expect(endAt - startAt).toBeLessThanOrEqual(5500);
        done();
      },
    });
  }, 10 * 1000);

  test('excludeErrorFunctions', (done) => {
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
      retryWhen(genericRetryStrategy(logger, { excludeErrorFunctions: [(error): boolean => error.constructor === ValueToHighError] })),
    );
    example.subscribe({
      error: (err) => {
        const endAt = performance.now();
        expect(err.constructor).toBe(ValueToHighError);
        expect(endAt - startAt).toBeLessThanOrEqual(2500);
        done();
      },
    });
  }, 10 * 1000);

  test('isErrorConstructor', (done) => {
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
      retryWhen(genericRetryStrategy(logger, { excludeErrorFunctions: [isErrorConstructor(ValueToHighError)] })),
    );
    example.subscribe({
      error: (err) => {
        const endAt = performance.now();
        expect(err.constructor).toBe(ValueToHighError);
        expect(endAt - startAt).toBeLessThanOrEqual(2500);
        done();
      },
    });
  }, 10 * 1000);

  test('isErrorConstructor Error', (done) => {
    const source = interval(500);
    const startAt = performance.now();
    const example = source.pipe(
      map((value) => {
        if (value > 2) {
          // error will be picked up by retryWhen
          throw new Error(`Value ${ value } is to high.`);
        }
        console.log('value', value);
        return value;
      }),
      retryWhen(genericRetryStrategy(logger, { excludeErrorFunctions: [isErrorConstructor(Error)] })),
    );
    example.subscribe({
      error: (err) => {
        const endAt = performance.now();
        expect(err.constructor).toBe(Error);
        expect(endAt - startAt).toBeLessThanOrEqual(2500);
        done();
      },
    });
  }, 10 * 1000);
});
