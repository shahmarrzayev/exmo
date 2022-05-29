import { PermissionDto } from './permission.dto';
import { ERole } from '../enum/role.enum';
import { RoleEntity } from '../entity/role.entity';

export class RoleDto {
  id: number;
  title: ERole;
  permissions: PermissionDto[];

  public static fromEntity(entity: RoleEntity): RoleDto {
    if (!entity) return null;
    const dto = new RoleDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.permissions = Array.isArray(entity.permissions) ? entity.permissions.map(PermissionDto.fromEntity) : [];
    return dto;
  }
}
