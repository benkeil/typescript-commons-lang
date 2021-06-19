import FieldErrorDetailBuilder from './FieldErrorDetailBuilder';
import GeneralErrorDetailBuilder from './GeneralErrorDetailBuilder';
import FieldErrorDetail from './FieldErrorDetail';
import GeneralErrorDetail from './GeneralErrorDetail';

export default class ErrorDetailFactory {
  public static createFieldErrorDetail(builder: FieldErrorDetailBuilder): ErrorDetailFactory {
    return FieldErrorDetail.create(builder);
  }

  public static createGeneralErrorDetail(builder: GeneralErrorDetailBuilder): ErrorDetailFactory {
    return GeneralErrorDetail.create(builder);
  }
}
