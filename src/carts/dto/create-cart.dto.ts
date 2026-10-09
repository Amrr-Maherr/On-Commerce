import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

export class CartItemDto {
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

export class CreateCartDto {
  @IsMongoId({ message: 'Cart owner id must be a valid id' })
  @IsNotEmpty({ message: 'Please provide a cart owner id' })
  cartOwner: string;

  @IsArray({ message: 'Products must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  products: CartItemDto[];
}
