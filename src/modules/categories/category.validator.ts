import { ValidationChain } from 'express-validator';
import { bodyField } from '../../utils/express-validation.js';

function categoryChains(optional: boolean): ValidationChain[] {
  return [
    bodyField('name', optional)
      .isString()
      .withMessage('name must be a string')
      .notEmpty()
      .withMessage('name must not be empty'),
    bodyField('slug', optional)
      .isString()
      .withMessage('slug must be a string')
      .notEmpty()
      .withMessage('slug must not be empty'),
    bodyField('image', optional)
      .isString()
      .withMessage('image must be a string')
      .notEmpty()
      .withMessage('image must not be empty'),
  ];
}

export const validateCreateCategory = categoryChains(false);
export const validateUpdateCategory = categoryChains(true);
