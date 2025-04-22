import { Request, Response, NextFunction } from 'express';
import { constants } from '../constants';

interface ErrorResponse {
  title: string;
  message: string;
  stackTrace?: string;
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  let errorResponse: ErrorResponse;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      errorResponse = {
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      };
      break;

    case constants.NOT_FOUND:
      errorResponse = {
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      };
      break;

    case constants.UNAUTHORIZED:
      errorResponse = {
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      };
      break;

    case constants.FORBIDDEN:
      errorResponse = {
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      };
      break;

    case constants.SERVER_ERROR:
      errorResponse = {
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      };
      break;

    default:
      console.log("No Error, All good!");
      return;
  }

  res.status(statusCode).json(errorResponse);
};

export { errorHandler };
