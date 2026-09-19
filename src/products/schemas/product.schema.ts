import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, collection: 'products', versionKey: false })
export class Product {
  // Basic information
  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    required: true,
    trim: true,
  })
  slug: string;

  @Prop({
    required: true,
    trim: true,
  })
  description: string;

  // Relations / classification
  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Brand',
  })
  brand: Types.ObjectId;

  // Pricing & inventory
  @Prop({
    required: true,
    min: 0,
  })
  price: number;

  @Prop({
    required: true,
    min: 0,
  })
  quantity: number;

  // Images
  @Prop({
    required: true,
    trim: true,
  })
  imageCover: string;

  @Prop({
    type: [String],
    required: true,
  })
  images: string[];

  // Ratings
  @Prop({
    default: 0,
    min: 0,
    max: 5,
  })
  ratingsAverage: number;

  @Prop({
    default: 0,
    min: 0,
  })
  ratingsQuantity: number;

  // Sales
  @Prop({
    default: 0,
    min: 0,
  })
  sold: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
