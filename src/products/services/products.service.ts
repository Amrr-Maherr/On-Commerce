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
        const products = await this.productModel
            .find()
            .limit(24)
            .select('title price sold ratingsAverage ratingsQuantity imageCover category brand')
            .populate('brand', 'name slug image')
            .populate('category', 'name slug image');
        return {
            status: "success",
            results: products.length,
            data: {
                "products": products,
            }
        };
    }

    async createProduct(data: any) {
        return this.productModel.create(data);
    }

    async updateProduct(id: string, data: any) {
        return this.productModel
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('brand', 'name slug image')
            .populate('category', 'name slug image');
    }

    async deleteProduct(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }

    async singleProduct(id: string) {
        return this.productModel
            .findById(id)
            .populate('brand', 'name slug image')
            .populate('category', 'name slug image');
    }
}