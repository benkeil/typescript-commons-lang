import RuntimeError from './RuntimeError';
import RuntimeErrorBuilder from './RuntimeErrorBuilder';
import FieldErrorDetail from './FieldErrorDetail';
import GeneralErrorDetail from './GeneralErrorDetail';

class TestRuntimeError extends RuntimeError {
  constructor(builder: RuntimeErrorBuilder) {
    super(builder);
  }
}

describe('RuntimeError', () => {
  test('should build a simple RuntimeError object', () => {
    new RuntimeError({
      message: 'This is an error message.',
      type: 'error_type',
    });
  });

  test('should build a RuntimeError object with details', () => {
    new RuntimeError({
      message: 'This is an error message.',
      type: 'error_type',
      details: [
        GeneralErrorDetail.create({
          message: 'This is a detail error message.',
          type: 'unknown_error',
        }),
      ],
    });
  });

  test('should build a complete RuntimeError object with a cause', () => {
    new RuntimeError({
      message: 'This is an error message.',
      type: 'error_type',
      details: [
        GeneralErrorDetail.create({
          message: 'This is a detail error message.',
          type: 'unknown_error',
        }),
      ],
      cause: new Error('This is the root error message.'),
    });
  });

  test('should return the correct type', () => {
    try {
      throw new TestRuntimeError({
        message: 'This is an error message.',
        type: 'error_type',
      });
    } catch (error) {
      console.log('Exception caught:', error);
      expect(error).toBeInstanceOf(RuntimeError);
      expect(error).toBeInstanceOf(TestRuntimeError);
      expect(error instanceof TestRuntimeError).toBe(true);
      expect(error.constructor.name).toBe('TestRuntimeError');
    }
  });

  test('should build a complete RuntimeError object with a cause and different details', () => {
    new RuntimeError({
      message: 'This is an error message.',
      type: 'error_type',
      details: [
        FieldErrorDetail.create({
          message: 'This is a detail error message.',
          type: 'unknown_error',
          field: 'testProperty',
        }),
        GeneralErrorDetail.create({ message: 'The API returned 404' }),
        GeneralErrorDetail.create({ message: 'The API returned 404', type: 'unknown_error' }),
      ],
      cause: new Error('This is the root error message.'),
    });
  });
});
