import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from '../../products/dto/create-product.dto.js';

export class UpdateBrandDto extends PartialType(CreateProductDto){
}
