import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SendVerificationCode {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
