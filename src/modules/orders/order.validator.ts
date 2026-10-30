import { ValidationChain } from 'express-validator';
import { bodyField } from '../../utils/express-validation.js';
import { OrderStatus, PaymentMethod } from './order.schema.js';

const paymentMethods = Object.values(PaymentMethod);
const orderStatuses = Object.values(OrderStatus);

function orderChains(optional: boolean): ValidationChain[] {
  return [
    bodyField('user', optional)
      .notEmpty()
      .withMessage('Please provide a user id')
      .isMongoId()
      .withMessage('User id must be a valid id'),
    bodyField('items', optional)
      .isArray()
      .withMessage('Items must be an array'),
    bodyField('items.*.product', false)
      .notEmpty()
      .withMessage('Please provide a product id')
      .isMongoId()
      .withMessage('Product id must be a valid id'),
    bodyField('items.*.quantity', false)
      .isInt()
      .withMessage('Quantity must be a whole number')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),
    bodyField('items.*.price', false)
      .isFloat()
      .withMessage('Price must be a number')
      .isFloat({ min: 0 })
      .withMessage('Price cannot be negative'),
    bodyField('shippingAddress', optional)
      .isString()
      .withMessage('Shipping address must be a text value')
      .notEmpty()
      .withMessage('Please provide a shipping address')
      .isLength({ max: 200 })
      .withMessage('Shipping address cannot be longer than 200 characters'),
    bodyField('paymentMethod', optional)
      .isIn(paymentMethods)
      .withMessage('Payment method must be either card or cash'),
    bodyField('status', true)
      .isIn(orderStatuses)
      .withMessage('Invalid order status'),
    bodyField('isPaid', true)
      .isBoolean()
      .withMessage('isPaid must be a boolean value'),
  ];
}

export const validateCreateOrder = orderChains(false);
export const validateUpdateOrder = orderChains(true);
