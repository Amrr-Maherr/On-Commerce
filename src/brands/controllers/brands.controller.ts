import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BrandsService } from '../services/brands.service.js';
import { CreateBrandDto } from '../dto/create-brand.dto.js';
import { BrandId } from '../dto/brand-id.dto.js';
import { UpdateBrandDto } from '../dto/update-brand.dto.js';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  async getBrands() {
    return this.brandsService.getBrands();
  }

  @Post()
  async createBrand(@Body() data: CreateBrandDto) {
    return this.brandsService.createBrand(data);
  }

  @Patch(':id')
  async updateBrand(
    @Param() params: BrandId,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.updateBrand(params.id, updateBrandDto);
  }

  @Delete(':id')
  async deleteBrand(@Param() params: BrandId) {
    return this.brandsService.deleteBrand(params.id);
  }

  @Get(':id')
  async singleBrand(@Param() params: BrandId) {
    return this.brandsService.singleBrand(params.id);
  }
}
