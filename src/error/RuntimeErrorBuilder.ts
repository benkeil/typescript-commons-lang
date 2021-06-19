import RuntimeError from './RuntimeError';

type RuntimeErrorBuilder = Pick<RuntimeError, 'message' | 'type' | 'details' | 'cause'>;

export default RuntimeErrorBuilder;
