import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

export enum PaymentMethod {
  Card = 'card',
  Cash = 'cash',
}

export enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}

@Schema({ timestamps: true, collection: 'orders', versionKey: false })
export class Order {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'An order must belong to a user'],
  })
  user: Types.ObjectId;

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
  items: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({
    type: Number,
    default: 0,
    min: [0, 'Total price cannot be negative'],
  })
  totalPrice: number;

  @Prop({
    type: Number,
    default: 0,
    min: [0, 'Total quantity cannot be negative'],
  })
  totalQuantity: number;

  @Prop({
    required: [true, 'Please provide a shipping address'],
    trim: true,
    maxlength: [200, 'Shipping address cannot be longer than 200 characters'],
  })
  shippingAddress: string;

  @Prop({
    type: String,
    enum: {
      values: Object.values(PaymentMethod),
      message: 'Payment method must be either card or cash',
    },
    required: [true, 'Please provide a payment method'],
  })
  paymentMethod: PaymentMethod;

  @Prop({
    type: String,
    enum: {
      values: Object.values(OrderStatus),
      message: 'Invalid order status',
    },
    default: OrderStatus.Pending,
  })
  status: OrderStatus;

  @Prop({
    type: Boolean,
    default: false,
  })
  isPaid: boolean;

  @Prop({
    type: Date,
  })
  paidAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
