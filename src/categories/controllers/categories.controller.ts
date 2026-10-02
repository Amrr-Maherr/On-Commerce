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
import { CategoriesService } from '../services/categories.service.js';
import { CreateCategoryDto } from '../dto/create-category.dto.js';
import { UpdateCategoryDto } from '../dto/update-category.dto.js';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.categoriesService.createCategory(data);
  }

  @Patch(':id')
  async updateCategory(
    @Param() params: MongoIdParamDto,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(params.id, updateCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param() params: MongoIdParamDto) {
    return this.categoriesService.deleteCategory(params.id);
  }

  @Get(':id')
  async singleCategory(@Param() params: MongoIdParamDto) {
    return this.categoriesService.singleCategory(params.id);
  }
}
