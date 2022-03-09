import { HttpErrorResponse } from '../HttpErrorResponse';

export class Forbidden extends HttpErrorResponse {
  constructor(message = 'Permission denied') {
    super(403, { error: message });
  }
}
