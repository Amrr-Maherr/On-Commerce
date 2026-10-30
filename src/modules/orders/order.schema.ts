import { Schema, Types, model } from 'mongoose';

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

export const OrderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'An order must belong to a user'],
    },
    items: {
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
    totalPrice: {
      type: Number,
      default: 0,
      min: [0, 'Total price cannot be negative'],
    },
    totalQuantity: {
      type: Number,
      default: 0,
      min: [0, 'Total quantity cannot be negative'],
    },
    shippingAddress: {
      type: String,
      required: [true, 'Please provide a shipping address'],
      trim: true,
      maxlength: [200, 'Shipping address cannot be longer than 200 characters'],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: Object.values(PaymentMethod),
        message: 'Payment method must be either card or cash',
      },
      required: [true, 'Please provide a payment method'],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(OrderStatus),
        message: 'Invalid order status',
      },
      default: OrderStatus.Pending,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true, collection: 'orders', versionKey: false },
);

export const Order = model('Orders', OrderSchema);
