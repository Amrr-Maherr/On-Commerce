import { Router } from 'express';
import * as usersController from './users.controller.js';
import { handleValidation } from '../../middlewares/validation.js';
import { validateIdParam } from '../../middlewares/validate-id-param.js';
import {
  validateCreateUser,
  validateUpdateUser,
} from './user.validator.js';

export const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.post(
  '/',
  ...validateCreateUser,
  handleValidation,
  usersController.createUser,
);
usersRouter.patch(
  '/:id',
  validateIdParam,
  ...validateUpdateUser,
  handleValidation,
  usersController.updateUser,
);
usersRouter.delete('/:id', validateIdParam, usersController.deleteUser);
usersRouter.get('/:id', validateIdParam, usersController.singleUser);
