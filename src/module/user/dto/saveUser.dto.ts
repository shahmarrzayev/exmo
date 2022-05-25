import { IsNotEmpty, IsString } from 'class-validator';
import { EGender } from '../user.enum';

export class SaveUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  gender: EGender;

  @IsNotEmpty()
  birthDate: Date;
}
