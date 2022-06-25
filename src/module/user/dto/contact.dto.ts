import { ContactEntity } from '../entity/contact.entity';
import { EGender } from '../user.enum';

export class ContactDto {
  firstName: string;
  lastName: string;
  contactFirstName: string;
  contactLastName: string;
  username: string;
  birthDate: string;
  lastSeen: string;
  gender: EGender;
  profileImage: string;

  public static fromEntity(entity: ContactEntity): ContactDto {
    if (!entity) return null;
    const dto = new ContactDto();
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.username = entity.username;
    dto.birthDate = entity.birthDate.toISOString();
    dto.lastSeen = entity.lastSeen.toISOString();
    dto.gender = entity.gender;
    dto.profileImage = entity.profileImage;
    return dto;
  }
}
