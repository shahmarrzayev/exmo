import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../entity/user.entity';
import { EGender } from '../user.enum';

export class SaveUserDto {
  @IsString()
  @IsOptional()
  blockedUsersIds: number[];

  @IsString({ each: true })
  @IsOptional()
  contactsIds: number[];

  // @IsString()
  // @IsOptional()
  // contactInfoId: number;

  public static toEntity(dto: SaveUserDto): UserEntity {
    if (!dto) return null;
    const entity = new UserEntity();
    return entity;
  }
}
