import { ErrorCode } from '../ErrorCode';
import { ControllerError } from './ControllerError';

export class UnauthorizedError extends ControllerError {
  constructor() {
    super('Unauthorized', ErrorCode.USER_UNAUTHORIZED, 401);
  }
}
