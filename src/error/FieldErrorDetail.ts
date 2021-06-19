import GeneralErrorDetail from './GeneralErrorDetail';
import FieldErrorDetailBuilder from './FieldErrorDetailBuilder';

export default class FieldErrorDetail extends GeneralErrorDetail {
  readonly field: string;
  readonly type: string;

  constructor(message: string, type: string, field: string) {
    super(message);
    this.type = type;
    this.field = field;
  }

  public static create({ message, type, field }: FieldErrorDetailBuilder): FieldErrorDetail {
    return new FieldErrorDetail(message, type, field);
  }
}
