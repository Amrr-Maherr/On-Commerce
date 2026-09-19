import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from './controllers/categories.controller.js';
import { CategoriesService } from './services/categories.service.js';

import { Category, CategorySchema } from './schemas/category.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],

  controllers: [CategoriesController],

  providers: [CategoriesService],

  exports: [CategoriesService],
})
export class CategoriesModule {}
