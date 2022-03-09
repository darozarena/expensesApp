import { HttpResponse } from '../HttpResponse';
import { Response } from 'express';

export class Created<T> extends HttpResponse<T> {
  private constructor(model: T) {
    super(201, model);
  }

  static send<T>(res: Response, message: T) {
    new Created<T>(message).send(res);
  }
}
