import { HttpResponse } from '../HttpResponse';
import { Response } from 'express';

export class Ok<T> extends HttpResponse<T> {
  private constructor(model: T) {
    super(200, model);
  }

  static send<T>(res: Response, message: T) {
    new Ok<T>(message).send(res);
  }
}
