import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
  @IsString()
  lastSeen?: string;

  public static toEntity(dto: SaveUserDto): UserEntity {
    if (!dto) return null;
    const entity = new UserEntity();
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.username = dto.username;
    entity.gender = dto.gender;
    entity.image = dto.image;
    entity.refferalCode = dto.refferalCode;
    entity.birthDate = dto.birthDate ? new Date(dto.birthDate) : null;
    entity.lastSeen = dto.lastSeen ? new Date(dto.lastSeen) : null;
    return entity;
  }
}
