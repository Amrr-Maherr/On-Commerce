import { Router } from 'express';
import { getHello } from '../app.controller.js';
import { productsRouter } from '../modules/products/products.routes.js';
import { brandsRouter } from '../modules/brands/brands.routes.js';
import { categoriesRouter } from '../modules/categories/categories.routes.js';
import { usersRouter } from '../modules/users/users.routes.js';
import { cartsRouter } from '../modules/carts/carts.routes.js';
import { ordersRouter } from '../modules/orders/orders.routes.js';

export const apiRouter = Router();

apiRouter.get('/', getHello);
apiRouter.use('/products', productsRouter);
apiRouter.use('/brands', brandsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/carts', cartsRouter);
apiRouter.use('/orders', ordersRouter);
