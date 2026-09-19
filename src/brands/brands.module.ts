import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BrandsController } from './controllers/brands.controller.js';
import { BrandsService } from './services/brands.service.js';

import { Brand, BrandSchema } from './schemas/brand.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],

  controllers: [BrandsController],

  providers: [BrandsService],

  exports: [BrandsService],
})
export class BrandsModule {}
