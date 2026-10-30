import { Router } from 'express';
import * as categoriesController from './categories.controller.js';
import { handleValidation } from '../../middlewares/validation.js';
import { validateIdParam } from '../../middlewares/validate-id-param.js';
import {
  validateCreateCategory,
  validateUpdateCategory,
} from './category.validator.js';

export const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getCategories);
categoriesRouter.post(
  '/',
  ...validateCreateCategory,
  handleValidation,
  categoriesController.createCategory,
);
categoriesRouter.patch(
  '/:id',
  validateIdParam,
  ...validateUpdateCategory,
  handleValidation,
  categoriesController.updateCategory,
);
categoriesRouter.delete(
  '/:id',
  validateIdParam,
  categoriesController.deleteCategory,
);
categoriesRouter.get('/:id', validateIdParam, categoriesController.singleCategory);
