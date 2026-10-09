import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users', versionKey: false })
export class User {
    @Prop({
        required: [true, 'Please provide your name'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot be longer than 50 characters'],
    })
    name: string;

    @Prop({
        required: [true, 'Please provide your email'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    })
    email: string;

    @Prop({
        required: [true, 'Please provide your phone number'],
        trim: true,
        unique: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'],
    })
    phoneNumber: string;

    @Prop({
        required: [true, 'Please provide your address'],
        trim: true,
        maxlength: [200, 'Address cannot be longer than 200 characters'],
    })
    address: string;
    @Prop({
        type: Types.ObjectId,
        ref: 'Orders',
        required: false,
    })
    orders: Types.ObjectId;
    @Prop({
        type: Types.ObjectId,
        ref: 'Cart',
        required: false,
    })
    cart: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
