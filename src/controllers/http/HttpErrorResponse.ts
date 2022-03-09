import { HttpResponse } from './HttpResponse';
import { ErrorMessage } from './types';

export class HttpErrorResponse extends HttpResponse<ErrorMessage> {
}
