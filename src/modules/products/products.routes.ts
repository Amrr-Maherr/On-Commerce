import { Router } from 'express';
import * as productsController from './products.controller.js';
import { handleValidation } from '../../middlewares/validation.js';
import { validateIdParam } from '../../middlewares/validate-id-param.js';
import {
  validateCreateProduct,
  validateUpdateProduct,
} from './product.validator.js';

export const productsRouter = Router();

productsRouter.get('/', productsController.getProducts);
productsRouter.post(
  '/',
  ...validateCreateProduct,
  handleValidation,
  productsController.createProduct,
);
productsRouter.patch(
  '/:id',
  validateIdParam,
  ...validateUpdateProduct,
  handleValidation,
  productsController.updateProduct,
);
productsRouter.delete('/:id', validateIdParam, productsController.deleteProduct);
productsRouter.get('/:id', validateIdParam, productsController.singleProduct);
