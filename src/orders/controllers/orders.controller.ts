import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { MongoIdParamDto } from '../../dto/mongo-id-param.dto.js';
import { OrdersService } from '../services/orders.service.js';
import { CreateOrderDto } from '../dto/create-order.dto.js';
import { UpdateOrderDto } from '../dto/update-order.dto.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Post()
  async createOrder(@Body() data: CreateOrderDto) {
    return this.ordersService.createOrder(data);
  }

  @Patch(':id')
  async updateOrder(
    @Param() params: MongoIdParamDto,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOrder(params.id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param() params: MongoIdParamDto) {
    return this.ordersService.deleteOrder(params.id);
  }

  @Get(':id')
  async singleOrder(@Param() params: MongoIdParamDto) {
    return this.ordersService.singleOrder(params.id);
  }
}
