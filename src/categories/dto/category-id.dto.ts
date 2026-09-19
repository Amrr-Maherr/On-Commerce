import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CategoryId {
  @IsNotEmpty({
    message: 'Please provide a category ID',
  })
  @IsMongoId({
    message: 'Please provide a valid category ID',
  })
  id: string;
}
