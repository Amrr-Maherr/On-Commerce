import type { RequestHandler } from 'express';
import { param } from 'express-validator';
import { handleValidation } from './validate-body.js';

export const validateIdParam: RequestHandler[] = [
  param('id')
    .notEmpty()
    .withMessage('Please provide an ID')
    .isMongoId()
    .withMessage('Please provide a valid ID'),
  handleValidation,
];
