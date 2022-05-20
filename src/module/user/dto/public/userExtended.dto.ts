import { UserEntity } from '../../user.entity';

export class UserExtendedDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  finCode: string;
  isActive: boolean;

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
    return dto;
  }
}
