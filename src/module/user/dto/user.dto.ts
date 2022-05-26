import { UserEntity } from '../user.entity';
import { EGender } from '../user.enum';

export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  birthDate: Date;
  lastSeen: Date;
  gender: EGender;
  blockedList: string[];
  image: string;
  refferalCode: string;

  public static fromEntity(entity: UserEntity): UserDto {
    if (!entity) return null;
    const dto = new UserDto();
    dto.id = entity.id;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.phoneNumber = entity.phoneNumber;
    dto.username = entity.username;
    dto.birthDate = entity.birthDate;
    dto.lastSeen = entity.lastSeen;
    dto.gender = entity.gender;
    dto.blockedList = entity.blockedList;
    dto.image = entity.image;
    dto.refferalCode = entity.refferalCode;
    return dto;
  }
}
