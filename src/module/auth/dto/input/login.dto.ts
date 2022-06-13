import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  verificationCode: string;
}
