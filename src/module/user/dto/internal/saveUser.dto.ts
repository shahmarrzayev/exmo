import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserEntity } from '../../user.entity';

export class SaveUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  finCode: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsInt()
  organizationId: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  roleIds: number[];

  public static toEntity(dto: SaveUserDto, encPassword: string): UserEntity {
    if (!dto || !encPassword) return null;
    const entity = new UserEntity();
    entity.email = dto.email;
    entity.password = encPassword;
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.phone = dto.phone;
    entity.finCode = dto.finCode;
    entity.isActive = dto.isActive;
    return entity;
  }
}
