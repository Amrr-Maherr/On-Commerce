import { Schema, Types, model } from 'mongoose';

export const CartSchema = new Schema(
  {
    cartOwner: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'A cart must belong to a user'],
    },
    products: {
      type: [
        {
          _id: false,
          product: {
            type: Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
          },
          price: {
            type: Number,
            required: true,
            min: 0,
          },
        },
      ],
      default: [],
    },
    totalCartPrice: {
      type: Number,
      default: 0,
      min: [0, 'Total cart price cannot be negative'],
    },
    numOfCartItems: {
      type: Number,
      default: 0,
      min: [0, 'Number of cart items cannot be negative'],
    },
  },
  { timestamps: true, collection: 'carts', versionKey: false },
);

export const Cart = model('Cart', CartSchema);
