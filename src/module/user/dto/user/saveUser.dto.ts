import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../../entity/user.entity';

export class SaveUserDto {
  @IsNumber()
  @IsOptional()
  latitude: number;

  @IsNumber()
  @IsOptional()
  longitude: number;

  @IsNumber({}, { each: true })
  @IsOptional()
  blockedUsersIds: number[];

  @IsString({ each: true })
  @IsOptional()
  contactsPhoneNumbers: string[];

  public static toEntity(dto: SaveUserDto): UserEntity {
    if (!dto) return null;
    const entity = new UserEntity();
    entity.latitude = dto.latitude;
    entity.longitude = dto.longitude;
    return entity;
  }
}
