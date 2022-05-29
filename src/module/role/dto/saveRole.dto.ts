import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ERole } from '../enum/role.enum';
import { RoleEntity } from '../entity/role.entity';

export class SaveRoleDto {
  @IsNotEmpty()
  @IsString()
  title: ERole;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  permissionIds: number[];

  public static toEntity(dto: SaveRoleDto): RoleEntity {
    if (!dto) return null;
    const entity = new RoleEntity();
    entity.title = dto.title;
    return entity;
  }
}
