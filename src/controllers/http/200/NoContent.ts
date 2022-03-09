import { HttpResponse } from '../HttpResponse';
import { Response } from 'express';

export class NoContent<T> extends HttpResponse<T> {
  private constructor(model: T) {
    super(204, model);
  }

  static send<T>(res: Response) {
    new NoContent<T>(null).send(res);
  }
}
