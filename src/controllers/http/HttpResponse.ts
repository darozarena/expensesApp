import { Response } from 'express';

export class HttpResponse<T> {
  public readonly httpCode: number;
  public readonly jsonMessage: T;

  constructor(httpCode: number, message: T) {
    this.jsonMessage = message;
    this.httpCode = httpCode;
  }

  send(res: Response) {
    res.status(this.httpCode).json(this.jsonMessage);
  }
}
