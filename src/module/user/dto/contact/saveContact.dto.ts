import { ContactEntity } from './../../entity/contact.entity';
import { EGender } from './../../user.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveContactDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsOptional()
  lastSeen: string;

  @IsEnum(EGender)
  @IsNotEmpty()
  gender: EGender;

  @IsString()
  @IsOptional()
  profileImage: string;

  @IsString()
  @IsOptional()
  referralCode: string;

  public static toEntity(dto: SaveContactDto): ContactEntity {
    const entity = new ContactEntity();
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.username = dto.username;
    entity.birthDate = new Date(dto.birthDate);
    entity.lastSeen = new Date(dto.lastSeen);
    entity.gender = dto.gender;
    entity.profileImage = dto.profileImage;
    entity.referralCode = dto.referralCode;
    return entity;
  }
}
