import { HttpResponse } from '../HttpResponse';
import { Response } from 'express';
import { ErrorMessage } from '../types';

export class Unauthorized extends HttpResponse<ErrorMessage> {
  private constructor(message: string) {
    super(401, { error: message });
  }

  static send(res: Response, message: string) {
    new Unauthorized(message).send(res);
  }
}
