import { ErrorCode } from '../ErrorCode';

export class ControllerError extends Error {
  public readonly httpCode: number;
  public readonly errorCode?: ErrorCode;
  public readonly publicMessage?: string;

  constructor(message: string, errorCode: ErrorCode, httpCode = 400, publicMessage?: string) {
    super(message);
    this.errorCode = errorCode;
    this.httpCode = httpCode;
    this.publicMessage = publicMessage;
  }
}
