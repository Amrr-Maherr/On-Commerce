import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products.controller.js';
import { ProductsService } from './services/products.service.js';

import {
  Product,
  ProductSchema,
} from './schemas/product.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],

  controllers: [ProductsController],

  providers: [ProductsService],

  exports: [ProductsService],
})
export class ProductsModule { }