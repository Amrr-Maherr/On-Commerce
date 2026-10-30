import { Router } from 'express';
import * as usersController from './users.controller.js';
import { validateBody } from '../../middlewares/validate-body.js';
import { validateIdParam } from '../../middlewares/validate-id-param.js';
import {
  validateCreateUser,
  validateUpdateUser,
} from './user.validator.js';

export const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.post('/', validateBody(validateCreateUser), usersController.createUser);
usersRouter.patch(
  '/:id',
  validateIdParam,
  validateBody(validateUpdateUser),
  usersController.updateUser,
);
usersRouter.delete('/:id', validateIdParam, usersController.deleteUser);
usersRouter.get('/:id', validateIdParam, usersController.singleUser);
