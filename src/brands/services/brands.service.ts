import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand, BrandDocument } from '../schemas/brand.schema.js';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<BrandDocument>,
  ) {}

  async getBrands() {
    return this.brandModel.find().select('name slug image');
  }

  async createBrand(data: any) {
    return this.brandModel.create(data);
  }

  async updateBrand(id: string, data: any) {
    return this.brandModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteBrand(id: string) {
    return this.brandModel.findByIdAndDelete(id);
  }

  async singleBrand(id: string) {
    return this.brandModel.findById(id);
  }
}
