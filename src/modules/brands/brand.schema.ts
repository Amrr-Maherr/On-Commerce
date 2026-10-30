import { Schema, model } from 'mongoose';

export const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, collection: 'brands', versionKey: false },
);

export const Brand = model('Brand', BrandSchema);
