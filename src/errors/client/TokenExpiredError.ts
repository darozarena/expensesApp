import { ErrorCode } from '../ErrorCode';
import { ControllerError } from './ControllerError';

export class TokenExpiredError extends ControllerError {
  constructor() {
    super('Token Expired', ErrorCode.USER_TOKEN_EXPIRED, 400);
  }
}
