import { IsNotEmpty, IsString } from 'class-validator';

export class AddManyContactsDto {
  @IsString({ each: true })
  @IsNotEmpty()
  phoneNumbers: string[];
}
