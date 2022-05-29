import { IsNotEmpty, IsString } from 'class-validator';
import { PermissionEntity } from '../entity/permission.entity';

export class SavePermissionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  public static toEntity(dto: SavePermissionDto): PermissionEntity {
    if (!dto) return null;
    const entity = new PermissionEntity();
    entity.title = dto.title;
    return entity;
  }
}
