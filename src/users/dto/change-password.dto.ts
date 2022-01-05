import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { IsEqualTo } from './match.decorator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsEqualTo('password')
  confirm_password: string;
}
