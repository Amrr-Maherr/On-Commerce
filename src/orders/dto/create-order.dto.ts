import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { OrderStatus, PaymentMethod } from '../schemas/orders.schemas.js';

export class OrderItemDto {
  @IsMongoId({ message: 'Product id must be a valid id' })
  @IsNotEmpty({ message: 'Please provide a product id' })
  product: string;

  @IsInt({ message: 'Quantity must be a whole number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  price: number;
}

export class CreateOrderDto {
  @IsMongoId({ message: 'User id must be a valid id' })
  @IsNotEmpty({ message: 'Please provide a user id' })
  user: string;

  @IsArray({ message: 'Items must be an array' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsString({ message: 'Shipping address must be a text value' })
  @IsNotEmpty({ message: 'Please provide a shipping address' })
  @MaxLength(200, {
    message: 'Shipping address cannot be longer than 200 characters',
  })
  shippingAddress: string;

  @IsEnum(PaymentMethod, {
    message: 'Payment method must be either card or cash',
  })
  paymentMethod: PaymentMethod;

  @IsEnum(OrderStatus, { message: 'Invalid order status' })
  @IsOptional()
  status?: OrderStatus;

  @IsBoolean({ message: 'isPaid must be a boolean value' })
  @IsOptional()
  isPaid?: boolean;
}
