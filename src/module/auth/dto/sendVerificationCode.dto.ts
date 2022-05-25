import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SendVerificationCodeDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
