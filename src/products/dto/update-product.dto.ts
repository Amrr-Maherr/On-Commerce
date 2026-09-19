import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsMongoId({
    message: 'Please provide a valid category ID',
  })
  @IsOptional()
  category?: string;

  @IsMongoId({
    message: 'Please provide a valid brand ID',
  })
  @IsOptional()
  brand?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  imageCover?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
