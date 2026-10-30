import { Router } from 'express';
import * as brandsController from './brands.controller.js';
import { handleValidation } from '../../middlewares/validation.js';
import { validateIdParam } from '../../middlewares/validate-id-param.js';
import {
  validateCreateBrand,
  validateUpdateBrand,
} from './brand.validator.js';

export const brandsRouter = Router();

brandsRouter.get('/', brandsController.getBrands);
brandsRouter.post(
  '/',
  ...validateCreateBrand,
  handleValidation,
  brandsController.createBrand,
);
brandsRouter.patch(
  '/:id',
  validateIdParam,
  ...validateUpdateBrand,
  handleValidation,
  brandsController.updateBrand,
);
brandsRouter.delete('/:id', validateIdParam, brandsController.deleteBrand);
brandsRouter.get('/:id', validateIdParam, brandsController.singleBrand);
