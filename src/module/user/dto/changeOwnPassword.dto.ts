import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeOwnPasswordDto {
  @IsNotEmpty()
  @IsString()
  currentPass: string;

  @IsNotEmpty()
  @IsString()
  newPass: string;
}
