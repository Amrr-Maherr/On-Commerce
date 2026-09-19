import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { BrandsModule } from './brands/brands.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.DB_URL!),
    ProductsModule,
    BrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
