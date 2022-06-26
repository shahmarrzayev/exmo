import { ContactDto } from './../contact/contact.dto';
import { UserEntity } from '../../entity/user.entity';
import { PostDto } from 'src/module/post/dto/post.dto';

export class UserDto {
  id: number;
  phoneNumber: string;
  contactInfo: ContactDto;
  contacts: ContactDto[];
  posts: PostDto[];
  blockedList: UserDto[];

  public static fromEntity(entity: UserEntity): UserDto {
    if (!entity) return null;
    const dto = new UserDto();
    dto.id = entity.id;
    dto.phoneNumber = entity.phoneNumber;
    dto.contactInfo = ContactDto.fromEntity(entity.contactInfo);
    dto.contacts = Array.isArray(entity.contacts) ? entity.contacts.map(ContactDto.fromEntity) : [];
    dto.blockedList = Array.isArray(entity.blockedList)
      ? entity.blockedList.map(UserDto.fromEntity)
      : [];
    return dto;
  }
}
