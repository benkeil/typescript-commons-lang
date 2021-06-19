import { ExcludeErrorFunction } from '../rxjs/genericRetryStrategy';

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type CustomErrorConstructor = new (...params: any) => Error;

export type Predicate<T> = (value: T) => boolean;

export type Supplier<O> = () => O;
export type Consumer<I> = (value: I) => void;
export type Mapper<I, O> = (value: I) => O;

export function isErrorConstructorOf(is: CustomErrorConstructor): ExcludeErrorFunction {
  return (error: Error): boolean => error.constructor === is;
}

export interface Comparable<T> {
  compare(another: T): number;
}

export function compare(one: number, other: number): number {
  if (one === other) {
    return 0;
  }
  return one > other ? 1 : -1;
}
