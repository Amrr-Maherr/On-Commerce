import { Router } from 'express';
import * as cartsController from './carts.controller.js';
import { handleValidation } from '../../middlewares/validation.js';
import { validateIdParam } from '../../middlewares/validate-id-param.js';
import {
  validateCreateCart,
  validateUpdateCart,
} from './cart.validator.js';

export const cartsRouter = Router();

cartsRouter.get('/', cartsController.getCarts);
cartsRouter.post(
  '/',
  ...validateCreateCart,
  handleValidation,
  cartsController.createCart,
);
cartsRouter.patch(
  '/:id',
  validateIdParam,
  ...validateUpdateCart,
  handleValidation,
  cartsController.updateCart,
);
cartsRouter.delete('/:id', validateIdParam, cartsController.deleteCart);
cartsRouter.get('/:id', validateIdParam, cartsController.singleCart);
