import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CheckVerificationCodeDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
