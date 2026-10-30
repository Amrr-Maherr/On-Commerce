import { ValidationChain } from 'express-validator';
import { bodyField } from '../../utils/express-validation.js';

function productChains(optional: boolean): ValidationChain[] {
  return [
    bodyField('title', optional)
      .isString()
      .withMessage('title must be a string')
      .notEmpty()
      .withMessage('title must not be empty'),
    bodyField('slug', optional)
      .isString()
      .withMessage('slug must be a string')
      .notEmpty()
      .withMessage('slug must not be empty'),
    bodyField('description', optional)
      .isString()
      .withMessage('description must be a string')
      .notEmpty()
      .withMessage('description must not be empty'),
    bodyField('category', optional)
      .notEmpty()
      .withMessage('category must not be empty')
      .isMongoId()
      .withMessage('category must be a mongodb id'),
    bodyField('brand', true).isMongoId().withMessage('brand must be a mongodb id'),
    bodyField('price', optional)
      .isFloat({ min: 0 })
      .withMessage('price must be a number greater than or equal to 0'),
    bodyField('quantity', optional)
      .isFloat({ min: 0 })
      .withMessage('quantity must be a number greater than or equal to 0'),
    bodyField('imageCover', optional)
      .isString()
      .withMessage('imageCover must be a string')
      .notEmpty()
      .withMessage('imageCover must not be empty'),
    bodyField('images', optional)
      .isArray()
      .withMessage('images must be an array'),
    bodyField('images.*', optional)
      .isString()
      .withMessage('images must be an array of strings'),
  ];
}

export const validateCreateProduct = productChains(false);
export const validateUpdateProduct = productChains(true);
