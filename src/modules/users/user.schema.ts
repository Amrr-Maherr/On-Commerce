import { Schema, Types, model } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot be longer than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true,
      unique: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'],
    },
    address: {
      type: String,
      required: [true, 'Please provide your address'],
      trim: true,
      maxlength: [200, 'Address cannot be longer than 200 characters'],
    },
    orders: {
      type: Types.ObjectId,
      ref: 'Orders',
      required: false,
    },
    cart: {
      type: Types.ObjectId,
      ref: 'Cart',
      required: false,
    },
  },
  { timestamps: true, collection: 'users', versionKey: false },
);

export const User = model('User', UserSchema);
