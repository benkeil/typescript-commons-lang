import RuntimeError from './RuntimeError';
import StaticTypedRuntimeErrorBuilder, { toRuntimeErrorBuilder } from './StaticTypedRuntimeErrorBuilder';

describe('StaticTypedRuntimeErrorBuilder', () => {
  test('compile', () => {
    class InvalidValueError extends RuntimeError {
      constructor(builder: StaticTypedRuntimeErrorBuilder) {
        super(toRuntimeErrorBuilder('invalid_value', builder));
      }
    }

    try {
      throw new InvalidValueError({ message: 'Field foo must not be null.' });
    } catch (e) {
      const error = e as RuntimeError;
      expect(error.message).toBe('Field foo must not be null.');
      expect(error.type).toBe('invalid_value');
    }
  });
});
