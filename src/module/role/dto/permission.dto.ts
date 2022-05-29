import { PermissionEntity } from '../entity/permission.entity';

export class PermissionDto {
  id: number;
  title: string;

  public static fromEntity(entity: PermissionEntity): PermissionDto {
    if (!entity) return null;
    const dto = new PermissionDto();
    dto.id = entity.id;
    dto.title = entity.title;
    return dto;
  }
}
