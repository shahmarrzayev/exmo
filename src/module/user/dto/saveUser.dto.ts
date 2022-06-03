import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsArray,
  IsInt,
} from 'class-validator';
import { UserEntity } from '../user.entity';
import { EGender } from '../user.enum';

export class SaveUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEnum(EGender)
  gender: EGender;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  refferalCode: string;

  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  roleIds: number[];

  public static toEntity(dto: SaveUserDto): UserEntity {
    const entity = new UserEntity();
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.phoneNumber = dto.phoneNumber;
    entity.username = dto.username;
    entity.gender = dto.gender;
    entity.image = dto.image;
    entity.refferalCode = dto.refferalCode;
    entity.birthDate = new Date(dto.birthDate);
    return entity;
  }
}
