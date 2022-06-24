import { UserContactEntity } from '../entity/contact.entity';
import { EGender } from '../user.enum';

export class ContactDto {
  firstName: string;
  lastName: string;
  username: string;
  birthDate: Date;
  lastSeen: Date;
  gender: EGender;
  image: string;

  public static fromEntity(entity: UserContactEntity): ContactDto {
    if (!entity) return null;
    const dto = new ContactDto();
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.username = entity.username;
    dto.birthDate = entity.birthDate;
    dto.lastSeen = entity.lastSeen;
    dto.gender = entity.gender;
    dto.image = entity.image;
    return dto;
  }
}
