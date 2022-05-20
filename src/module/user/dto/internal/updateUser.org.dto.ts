import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../../user.entity';

export class UpdateUserOrgDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  public static toEntity(dto: UpdateUserOrgDto): UserEntity {
    if (!dto) return null;
    const entity = new UserEntity();
    entity.email = dto.email;
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.phone = dto.phone;
    entity.isActive = dto.isActive;
    return entity;
  }
}
