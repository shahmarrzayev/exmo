import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class checkVerificationCodeDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
