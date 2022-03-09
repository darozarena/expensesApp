import { Response } from 'express';
import { HttpErrorResponse } from '../HttpErrorResponse';

export class NotFound extends HttpErrorResponse {
  constructor(message: string) {
    super(404, { error: message });
  }

  /**
   * @deprecated use constructor directly
   * @param res
   * @param message
   */
  static send(res: Response, message: string) {
    throw new NotFound(message);
  }
}
