import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Query,
  InternalServerErrorException,
  Body,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
import { ProductId } from '../dto/product-id.dto.js';
import { UpdateProductDto } from '../dto/update-product.dto.js';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts() {}
  @Post()
  createProduct(@Body() newProduct: CreateProductDto) {}
  @Patch(':id')
  updateProduct(
    @Param('id') params: ProductId,
    @Body() updateProductDto: UpdateProductDto,
  ) {}
  @Delete(':id')
  deleteProduct(@Param('id') id: ProductId) {}
  @Get(':id')
  singleProduct(@Param('id') id: ProductId) {}
}
