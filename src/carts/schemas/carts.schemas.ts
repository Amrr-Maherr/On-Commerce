import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true, collection: 'carts', versionKey: false })
export class Cart {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'A cart must belong to a user'],
  })
  cartOwner: Types.ObjectId;

  @Prop({
    type: [
      {
        _id: false,
        product: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1, default: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    default: [],
  })
  products: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({
    type: Number,
    default: 0,
    min: [0, 'Total cart price cannot be negative'],
  })
  totalCartPrice: number;

  @Prop({
    type: Number,
    default: 0,
    min: [0, 'Number of cart items cannot be negative'],
  })
  numOfCartItems: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
