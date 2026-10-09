import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart, CartDocument } from '../schemas/cart.schema.js';
import { CreateCartDto } from '../dto/create-cart.dto.js';
import { UpdateCartDto } from '../dto/update-cart.dto.js';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
  ) {}

  async getCarts() {
    return this.cartModel
      .find()
      .populate('cartOwner', 'name email')
      .populate('products.product', 'title price imageCover');
  }

  async createCart(data: CreateCartDto) {
    return this.cartModel.create(data);
  }

  async updateCart(id: string, data: UpdateCartDto) {
    return this.cartModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteCart(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }

  async singleCart(id: string) {
    return this.cartModel
      .findById(id)
      .populate('cartOwner', 'name email')
      .populate('products.product', 'title price imageCover');
  }
}
