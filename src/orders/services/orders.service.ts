import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrderDocument } from '../schemas/order.schema.js';
import { CreateOrderDto } from '../dto/create-order.dto.js';
import { UpdateOrderDto } from '../dto/update-order.dto.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Orders')
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async getOrders() {
    return this.orderModel
      .find()
      .populate('user', 'name email')
      .populate('items.product', 'title price imageCover');
  }

  async createOrder(data: CreateOrderDto) {
    return this.orderModel.create(data);
  }

  async updateOrder(id: string, data: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteOrder(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async singleOrder(id: string) {
    return this.orderModel
      .findById(id)
      .populate('user', 'name email')
      .populate('items.product', 'title price imageCover');
  }
}
