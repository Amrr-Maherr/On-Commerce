import { ValidationChain } from 'express-validator';
import { bodyField } from '../../utils/express-validation.js';

function cartChains(optional: boolean): ValidationChain[] {
  return [
    bodyField('cartOwner', optional)
      .notEmpty()
      .withMessage('Please provide a cart owner id')
      .isMongoId()
      .withMessage('Cart owner id must be a valid id'),
    bodyField('products', optional)
      .isArray()
      .withMessage('Products must be an array'),
    bodyField('products.*.product', false)
      .notEmpty()
      .withMessage('Please provide a product id')
      .isMongoId()
      .withMessage('Product id must be a valid id'),
    bodyField('products.*.quantity', false)
      .isInt()
      .withMessage('Quantity must be a whole number')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),
    bodyField('products.*.price', false)
      .isFloat()
      .withMessage('Price must be a number')
      .isFloat({ min: 0 })
      .withMessage('Price cannot be negative'),
  ];
}

export const validateCreateCart = cartChains(false);
export const validateUpdateCart = cartChains(true);
