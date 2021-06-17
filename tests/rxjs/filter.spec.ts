import {
  asyncScheduler,
  scheduled,
} from 'rxjs';
import { filter } from 'rxjs/operators';
import { filterEmpty, isEmpty } from '../../src/rxjs/filter';


describe('rxjs', () => {
  test('filterEmpty', (done) => {
    scheduled([1, undefined], asyncScheduler)
        .pipe(filterEmpty())
        .subscribe((value) => {
          expect(value).toBe(1);
          done();
        });
  });
  test('isEmpty', (done) => {
    scheduled([1, undefined], asyncScheduler)
        .pipe(filter(isEmpty))
        .subscribe((value) => {
          expect(value).toBe(1);
          done();
        });
  });
});
