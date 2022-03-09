import { ErrorCode } from '../ErrorCode';
import { ControllerError } from './ControllerError';

export class InvalidPasswordError extends ControllerError {
  constructor(email: string) {
    super(`Invalid password: ${email}`, ErrorCode.INVALID_PASSWORD, 400);
  }
}
