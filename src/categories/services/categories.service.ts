import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CategoryDocument } from '../schemas/category.schema.js';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getCategories() {
    return this.categoryModel.find().select('name slug image');
  }

  async createCategory(data: any) {
    return this.categoryModel.create(data);
  }

  async updateCategory(id: string, data: any) {
    return this.categoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteCategory(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }

  async singleCategory(id: string) {
    return this.categoryModel.findById(id);
  }
}
