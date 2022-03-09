import { ErrorCode } from '../ErrorCode';
import { ControllerError } from './ControllerError';

export class ControllerAssertionError extends ControllerError {
  constructor(message: string, fieldName?: string, errorCode = ErrorCode.INVALID_FIELD) {
    const description = fieldName ? ` Field: ${fieldName}` : '';
    super(message + description, errorCode);
  }
}
