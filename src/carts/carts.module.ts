import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartsController } from './controllers/carts.controller.js';
import { CartsService } from './services/carts.service.js';

import { Cart, CartSchema } from './schemas/cart.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema,
      },
    ]),
  ],

  controllers: [CartsController],

  providers: [CartsService],

  exports: [CartsService],
})
export class CartsModule {}
