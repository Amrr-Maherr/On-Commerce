import { Controller } from '@nestjs/common';
import { Get, Post, Delete, Patch, Param, Query, InternalServerErrorException, Body } from '@nestjs/common';
import { ProductsService } from '../services/products.service.js';
@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) { }
    @Get()
    getProducts() {

    }
    @Post()
    createProduct(@Body() newProduct: any) {

    }
    @Patch(":id")
    updateProduct(@Param("id") id: string) {

    }
    @Delete(":id")
    deleteProduct(@Param("id") id: string) {

    }
    @Get(":id")
    singleProduct(@Param("id") id: string) {

    }
}
