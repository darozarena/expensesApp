import { ErrorCode } from '../ErrorCode';
import { ControllerError } from './ControllerError';

export class UserNotFoundError extends ControllerError {
  constructor(email: string, publicMessage: string) {
    super(`User not found: ${email}`, ErrorCode.USER_NOT_FOUND, 400, publicMessage);
  }
}
