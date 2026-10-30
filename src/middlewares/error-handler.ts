import type { NextFunction, Request, Response } from 'express';

export class HttpError extends Error {
  statusCode: number;
  details: string | string[];
  error: string;

  constructor(statusCode: number, details: string | string[], error: string) {
    super(Array.isArray(details) ? details.join(', ') : details);
    this.statusCode = statusCode;
    this.details = details;
    this.error = error;
  }
}

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(new HttpError(404, `Cannot ${req.method} ${req.originalUrl}`, 'Not Found'));
}

export function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      message: error.details,
      error: error.error,
      statusCode: error.statusCode,
    });
    return;
  }

  const statusCode = error?.status ?? error?.statusCode;

  if (typeof statusCode === 'number' && statusCode >= 400 && statusCode < 500) {
    res.status(statusCode).json({
      message: error.message,
      error: 'Bad Request',
      statusCode,
    });
    return;
  }

  console.error(error);
  res.status(500).json({
    message: 'Internal server error',
    statusCode: 500,
  });
}
