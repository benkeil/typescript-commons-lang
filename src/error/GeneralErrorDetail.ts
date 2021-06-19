import ErrorDetail from './ErrorDetail';
import GeneralErrorDetailBuilder from './GeneralErrorDetailBuilder';

export default class GeneralErrorDetail implements ErrorDetail {
  readonly message: string;
  readonly type?: string;

  constructor(message: string, type?: string) {
    this.message = message;
    this.type = type;
  }

  public static create({ message, type }: GeneralErrorDetailBuilder): GeneralErrorDetail {
    return new GeneralErrorDetail(message, type);
  }
}
