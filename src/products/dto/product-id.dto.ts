import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ProductId {
  @IsNotEmpty({
    message: 'Please provide a product ID',
  })
  @IsMongoId({
    message: 'Please provide a valid product ID',
  })
  id: string;
}
