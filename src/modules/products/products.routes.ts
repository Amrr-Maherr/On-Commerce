import { Router } from 'express';
import * as productsController from './products.controller.js';
import { validateBody } from '../../middlewares/validate-body.js';
import { validateIdParam } from '../../middlewares/validate-id-param.js';
import {
  validateCreateProduct,
  validateUpdateProduct,
} from './product.validator.js';

export const productsRouter = Router();

productsRouter.get('/', productsController.getProducts);
productsRouter.post(
  '/',
  validateBody(validateCreateProduct),
  productsController.createProduct,
);
productsRouter.patch(
  '/:id',
  validateIdParam,
  validateBody(validateUpdateProduct),
  productsController.updateProduct,
);
productsRouter.delete('/:id', validateIdParam, productsController.deleteProduct);
productsRouter.get('/:id', validateIdParam, productsController.singleProduct);
