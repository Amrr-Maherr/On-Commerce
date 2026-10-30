import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpError } from './error-handler.js';

export function handleValidation(req: Request, _res: Response, next: NextFunction) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const messages = result.array().map((error) => error.msg);
    next(new HttpError(400, messages, 'Bad Request'));
    return;
  }

  next();
}
