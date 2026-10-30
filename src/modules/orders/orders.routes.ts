import { Router } from 'express';
import * as ordersController from './orders.controller.js';
import { validateBody } from '../../middlewares/validate-body.js';
import { validateIdParam } from '../../middlewares/validate-id-param.js';
import {
  validateCreateOrder,
  validateUpdateOrder,
} from './order.validator.js';

export const ordersRouter = Router();

ordersRouter.get('/', ordersController.getOrders);
ordersRouter.post(
  '/',
  validateBody(validateCreateOrder),
  ordersController.createOrder,
);
ordersRouter.patch(
  '/:id',
  validateIdParam,
  validateBody(validateUpdateOrder),
  ordersController.updateOrder,
);
ordersRouter.delete('/:id', validateIdParam, ordersController.deleteOrder);
ordersRouter.get('/:id', validateIdParam, ordersController.singleOrder);
