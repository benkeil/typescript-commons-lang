import {
  Observable, OperatorFunction, pipe, UnaryFunction,
} from 'rxjs';
import { filter } from 'rxjs/operators';

function filterEmpty<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
  return pipe(
    filter((x) => x != null) as OperatorFunction<T | null | undefined, T>,
  );
}

function isEmpty<T>(arg: T | null | undefined): arg is T {
  return arg !== null && arg !== undefined;
}

export {
  filterEmpty,
  isEmpty,
};
