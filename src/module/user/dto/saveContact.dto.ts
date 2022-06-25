import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ContactEntity } from '../entity/contact.entity';
import { EGender } from '../user.enum';

export class SaveContactDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  contactFirstName: string;

  @IsString()
  @IsOptional()
  contactLastName: string;

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
  refferralCode: string;

  public static toEntity(dto: SaveContactDto): ContactEntity {
    const entity = new ContactEntity();
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.contactFirstName = dto.contactFirstName;
    entity.contactLastName = dto.contactLastName;
    entity.username = dto.username;
    entity.birthDate = new Date(dto.birthDate);
    entity.lastSeen = new Date(dto.lastSeen);
    entity.gender = dto.gender;
    entity.profileImage = dto.profileImage;
    entity.refferalCode = dto.refferralCode;
    return entity;
  }
}
