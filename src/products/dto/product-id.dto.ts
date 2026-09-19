import { IsMongoId } from "class-validator";

export class ProductId {
    @IsMongoId()
    id: string;
}
