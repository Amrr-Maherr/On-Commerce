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
import { CartsService } from '../services/carts.service.js';
import { CreateCartDto } from '../dto/create-cart.dto.js';
import { UpdateCartDto } from '../dto/update-cart.dto.js';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async getCarts() {
    return this.cartsService.getCarts();
  }

  @Post()
  async createCart(@Body() data: CreateCartDto) {
    return this.cartsService.createCart(data);
  }

  @Patch(':id')
  async updateCart(
    @Param() params: MongoIdParamDto,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartsService.updateCart(params.id, updateCartDto);
  }

  @Delete(':id')
  async deleteCart(@Param() params: MongoIdParamDto) {
    return this.cartsService.deleteCart(params.id);
  }

  @Get(':id')
  async singleCart(@Param() params: MongoIdParamDto) {
    return this.cartsService.singleCart(params.id);
  }
}
