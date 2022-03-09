import { ControllerError } from './ControllerError';
import { ErrorCode } from '../../errors/ErrorCode';

export class UserAlreadyExistsError extends ControllerError {
  constructor(email: string) {
    super(`User already exists: ${email}`, ErrorCode.USER_ALREADY_EXISTS, 400);
  }
}
