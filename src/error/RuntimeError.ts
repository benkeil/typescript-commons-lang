import RuntimeErrorBuilder from './RuntimeErrorBuilder';
import ErrorDetail from './ErrorDetail';

export default class RuntimeError extends Error {
  public message: string;

  public type: string;

  public details?: ErrorDetail[];

  public cause?: Error;

  constructor(builder: RuntimeErrorBuilder) {
    super(builder.message);
    this.name = new.target.name;
    this.message = builder.message;
    this.type = builder.type;
    this.details = builder.details;
    this.cause = builder.cause;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
