import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true, collection: 'brands', versionKey: false })
export class Brand {
  @Prop({
    required: true,
    trim: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  })
  slug: string;

  @Prop({
    required: true,
    trim: true,
  })
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
