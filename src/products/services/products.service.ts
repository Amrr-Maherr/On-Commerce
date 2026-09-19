import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    Product,
    ProductDocument,
} from '../schemas/product.schema.js';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
    ) { }

    async getProducts() {
        return this.productModel.find().select('title price sold rating imageCover category brand');
    }

    async createProduct(data: any) {
        return this.productModel.create(data);
    }

    async updateProduct(id: string, data: any) {
        return this.productModel.findByIdAndUpdate(id, data, {
            new: true,
        });
    }

    async deleteProduct(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }

    async singleProduct(id: string) {
        return this.productModel.findById(id);
    }
}