import { ValidationChain } from 'express-validator';
import { bodyField } from '../../utils/express-validation.js';

function userChains(optional: boolean): ValidationChain[] {
  return [
    bodyField('name', optional)
      .isString()
      .withMessage('Name must be a text value')
      .notEmpty()
      .withMessage('Please provide your name')
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long')
      .isLength({ max: 50 })
      .withMessage('Name cannot be longer than 50 characters'),
    bodyField('email', optional)
      .isString()
      .withMessage('Email must be a text value')
      .notEmpty()
      .withMessage('Please provide your email')
      .isEmail()
      .withMessage('Please provide a valid email address'),
    bodyField('phoneNumber', optional)
      .isString()
      .withMessage('Phone number must be a text value')
      .notEmpty()
      .withMessage('Please provide your phone number')
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage('Please provide a valid phone number'),
    bodyField('address', optional)
      .isString()
      .withMessage('Address must be a text value')
      .notEmpty()
      .withMessage('Please provide your address')
      .isLength({ max: 200 })
      .withMessage('Address cannot be longer than 200 characters'),
  ];
}

export const validateCreateUser = userChains(false);
export const validateUpdateUser = userChains(true);
