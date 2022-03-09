import { HttpErrorResponse } from '../HttpErrorResponse';

export class BadRequest extends HttpErrorResponse {
  public constructor(message: string) {
    super(400, { error: message });
  }
}
