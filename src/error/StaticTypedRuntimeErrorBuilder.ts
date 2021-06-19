import RuntimeErrorBuilder from './RuntimeErrorBuilder';
import RuntimeError from './RuntimeError';

type StaticTypedRuntimeErrorBuilder = Required<Pick<RuntimeError, 'message'>> & Partial<Pick<RuntimeError, 'details' | 'cause'>>;

export default StaticTypedRuntimeErrorBuilder;

export function toRuntimeErrorBuilder(type: string, builder: StaticTypedRuntimeErrorBuilder): RuntimeErrorBuilder {
  return {
    message: builder.message,
    type: type,
    details: builder.details,
    cause: builder.cause,
  };
}
