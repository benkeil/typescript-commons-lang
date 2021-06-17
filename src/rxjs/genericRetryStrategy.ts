import { Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import Logger from '@trustedshops/etrusted-aaa-library-logging/dist/Logger';

export type ExcludeErrorFunction = (error: Error) => boolean;

interface RetryOptions {

  maxRetryAttempts?: number;

  retryInterval?: number;

  excludeErrorFunctions?: ExcludeErrorFunction[];

  backOffMultiplier?: number;

  maximumBackoff?: number;

}

type RequiredRetryOptions = Required<RetryOptions>;

const defaultOptions: RequiredRetryOptions = {
  maxRetryAttempts: 3,
  retryInterval: 1000,
  excludeErrorFunctions: [],
  backOffMultiplier: 1,
  maximumBackoff: 3000,
};

const genericRetryStrategy = (logger: Logger, options: RetryOptions = defaultOptions) => (attempts: Observable<any>): Observable<any> => attempts.pipe(
  mergeMap((error, i) => {
    const mergedOptions: RequiredRetryOptions = {
      maxRetryAttempts: options.maxRetryAttempts ?? defaultOptions.maxRetryAttempts,
      retryInterval: options.retryInterval ?? defaultOptions.retryInterval,
      backOffMultiplier: options.backOffMultiplier ?? defaultOptions.backOffMultiplier,
      maximumBackoff: options.maximumBackoff ?? defaultOptions.maximumBackoff,
      excludeErrorFunctions: options.excludeErrorFunctions ?? defaultOptions.excludeErrorFunctions,
    };
    const retryIn = Math.min(
      mergedOptions.retryInterval * (mergedOptions.backOffMultiplier ** i),
      mergedOptions.maximumBackoff,
    );

    const retryAttempt = i + 1;
    // if maximum number of retries have been met
    // or response is a status code we don't wish to retry, throw error
    if (
      retryAttempt > mergedOptions.maxRetryAttempts
          || mergedOptions.excludeErrorFunctions.find((func) => func(error))
    ) {
      return throwError(error);
    }

    logger.warn(`Attempt ${ retryAttempt }: retrying in ${ retryIn }ms`);
    // retry after 1s, 2s, etc...
    return timer(retryIn);
  }),
);

export default genericRetryStrategy;

export type CustomErrorConstructor = new(...params) => Error;

const isErrorConstructor = (is: CustomErrorConstructor): ExcludeErrorFunction => (error): boolean => error.constructor === is;

export { isErrorConstructor };
