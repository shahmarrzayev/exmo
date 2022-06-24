import { PostEntity } from 'src/module/post/post.entity';
import { RoleEntity } from 'src/module/role/entity/role.entity';
import { UserContactEntity } from '../entity/contact.entity';
import { UserEntity } from '../entity/user.entity';

export class UserDto {
  id: number;
  phoneNumber: string;
  contactInfo: UserContactEntity;
  contacts: UserContactEntity[];
  posts: PostEntity[];
  blockedList: UserEntity[];
  roles: RoleEntity[];

  public static fromEntity(entity: UserEntity): UserDto {
    if (!entity) return null;
    const dto = new UserDto();
    dto.id = entity.id;
    dto.contactInfo = entity.contactInfo;
    dto.blockedList = entity.blockedList;
    return dto;
  }
}
