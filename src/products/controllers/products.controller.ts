import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
import { ProductId } from '../dto/product-id.dto.js';
import { UpdateProductDto } from '../dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) { }

  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }

  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    return this.productsService.createProduct(data);
  }

  @Patch(':id')
  async updateProduct(
    @Param() params: ProductId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(
      params.id,
      updateProductDto,
    );
  }

  @Delete(':id')
  async deleteProduct(@Param() params: ProductId) {
    return this.productsService.deleteProduct(params.id);
  }

  @Get(':id')
  async singleProduct(@Param() params: ProductId) {
    return this.productsService.singleProduct(params.id);
  }
}