import { IsMongoId, IsNotEmpty } from 'class-validator';

/**
 * Shared `:id` route param contract for any resource keyed by a MongoDB
 * ObjectId. Imported by every module that exposes a `/:id` route.
 */
export class MongoIdParamDto {
  @IsNotEmpty({
    message: 'Please provide an ID',
  })
  @IsMongoId({
    message: 'Please provide a valid ID',
  })
  id: string;
}