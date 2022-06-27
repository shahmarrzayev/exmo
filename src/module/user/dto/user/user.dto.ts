import { ContactDto } from './../contact/contact.dto';
import { UserEntity } from '../../entity/user.entity';
import { PostDto } from 'src/module/post/dto/post.dto';

export class UserDto {
  id: number;
  phoneNumber: string;
  contact: ContactDto;
  contacts: ContactDto[];
  posts: PostDto[];
  blockedList: UserDto[];

  public static fromEntity(entity: UserEntity): UserDto {
    if (!entity) return null;
    const dto = new UserDto();
    dto.id = entity.id;
    dto.phoneNumber = entity.phoneNumber;
    dto.contact = ContactDto.fromEntity(entity.contact);
    dto.contacts = Array.isArray(entity.contact) ? entity.contacts.map(ContactDto.fromEntity) : [];
    dto.blockedList = Array.isArray(entity.blockedList)
      ? entity.blockedList.map(UserDto.fromEntity)
      : [];
    return dto;
  }
}
