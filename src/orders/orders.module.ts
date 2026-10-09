import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrdersController } from './controllers/orders.controller.js';
import { OrdersService } from './services/orders.service.js';

import { OrderSchema } from './schemas/orders.schemas.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Orders',
        schema: OrderSchema,
      },
    ]),
  ],

  controllers: [OrdersController],

  providers: [OrdersService],

  exports: [OrdersService],
})
export class OrdersModule {}
