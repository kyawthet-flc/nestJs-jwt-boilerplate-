import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsEmail()
  @IsString()
  email: string;
}
