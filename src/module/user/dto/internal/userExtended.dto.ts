import { RoleDto } from '../../../role/dto/role.dto';
import { UserEntity } from '../../user.entity';

export class UserExtendedDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  finCode: string;
  isActive: boolean;
  roles: RoleDto[];

  public static fromEntity(entity: UserEntity): UserExtendedDto {
    if (!entity) return null;
    const dto = new UserExtendedDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.phone = entity.phone;
    dto.finCode = entity.finCode;
    dto.isActive = entity.isActive;
    dto.roles = Array.isArray(entity.roles) ? entity.roles.map(RoleDto.fromEntity) : [];
    return dto;
  }
}
