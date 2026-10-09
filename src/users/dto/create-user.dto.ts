import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a text value' })
  @IsNotEmpty({ message: 'Please provide your name' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name cannot be longer than 50 characters' })
  name: string;

  @IsString({ message: 'Email must be a text value' })
  @IsNotEmpty({ message: 'Please provide your email' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString({ message: 'Phone number must be a text value' })
  @IsNotEmpty({ message: 'Please provide your phone number' })
  @IsPhoneNumber(undefined, { message: 'Please provide a valid phone number' })
  phoneNumber: string;

  @IsString({ message: 'Address must be a text value' })
  @IsNotEmpty({ message: 'Please provide your address' })
  @MaxLength(200, { message: 'Address cannot be longer than 200 characters' })
  address: string;
}
