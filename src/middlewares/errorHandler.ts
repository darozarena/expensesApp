import { ControllerError } from '../errors/client/ControllerError';
import { NotFound404Error } from '../errors/client/NotFound404Error';
import { HttpErrorResponse } from '../controllers/http/HttpErrorResponse';
import { ErrorCode } from '../errors/ErrorCode';
import { Logger } from '../utils/Logger';
import { ServiceError } from '../errors/client/ServiceError';

type ErrorResponse = {
  httpCode: number;
  message: string;
  errorCode?: ErrorCode;
};

const Response401: ErrorResponse = {
  httpCode: 401,
  message: 'Unauthorized'
};

const Response500: ErrorResponse = {
  httpCode: 500,
  message: 'Something broke!'
};

export const getErrorResponse = (err): ErrorResponse => {
  if (err instanceof ControllerError || err instanceof ServiceError) {
    return {
      errorCode: err.errorCode,
      httpCode: err.httpCode,
      message: err.publicMessage || err.message
    };
  }

  if (err.name === 'UnauthorizedError') {
    return Response401;
  }

  return Response500;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpErrorResponse) {
    Logger.info(err);
    res.status(err.httpCode).json(err.jsonMessage);
    return;
  }

  const { httpCode, message, errorCode } = getErrorResponse(err);
  const body: any = { error: message };
  if (errorCode) {
    body.errorCode = errorCode;
  }
  Logger.info(err);
  res.status(httpCode).json(body);
};

export const notFoundHandler = (req, res, next) => {
  const error = new NotFound404Error();
  Logger.info(error);
  next(error);
};
