import { ErrorCode } from '../ErrorCode';
import { ControllerError } from './ControllerError';

export class NotFound404Error extends ControllerError {
  constructor() {
    super('Not found', ErrorCode.GLOBAL_NOT_FOUND, 404);
  }
}
