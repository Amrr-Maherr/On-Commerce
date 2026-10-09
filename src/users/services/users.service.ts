import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../schemas/user.schemas.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers() {
    return this.userModel.find().select('name email phoneNumber address');
  }

  async createUser(data: CreateUserDto) {
    return this.userModel.create(data);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async singleUser(id: string) {
    return this.userModel
      .findById(id)
      .populate({
        path: 'cart',
        populate: { path: 'products.product', select: 'title price imageCover' },
      })
      .populate({
        path: 'orders',
        populate: { path: 'items.product', select: 'title price imageCover' },
      });
  }
}
