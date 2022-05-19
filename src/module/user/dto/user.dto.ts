import { UserEntity } from '../user.entity';

export class UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;

  public static fromEntity(entity: UserEntity): UserDto {
    if (!entity) return null;
    const dto = new UserDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.phone = entity.phone;
    dto.isActive = entity.isActive;
    return dto;
  }
}
