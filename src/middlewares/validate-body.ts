import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
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

export function sanitizeBody(req: Request, _res: Response, next: NextFunction) {
  req.body = matchedData(req, { locations: ['body'] });
  next();
}

export function validateBody(chains: RequestHandler[]): RequestHandler[] {
  return [...chains, handleValidation, sanitizeBody];
}
