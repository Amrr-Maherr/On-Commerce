import { IsMongoId, IsNotEmpty } from 'class-validator';

export class BrandId {
  @IsNotEmpty({
    message: 'Please provide a brand ID',
  })
  @IsMongoId({
    message: 'Please provide a valid brand ID',
  })
  id: string;
}
