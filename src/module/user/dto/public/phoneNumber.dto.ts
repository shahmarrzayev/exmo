import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class PhoneNumberDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
