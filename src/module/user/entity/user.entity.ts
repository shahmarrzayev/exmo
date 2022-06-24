import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../../role/entity/role.entity';
import { PostEntity } from '../../post/post.entity';
import { UserContactEntity } from './contact.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'is_user', default: true })
  isUser: boolean;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column({ name: 'refferal_code' })
  refferalCode?: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'verification_code' })
  verificationCode: string;

  @Column({ name: 'verification_code_exp_date' })
  verificationCodeExpDate: Date;

  @ManyToMany(() => UserEntity, (user) => user.blockedList)
  @JoinTable({
    name: 'blocked_list',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'blocked_user_id', referencedColumnName: 'id' },
  })
  blockedList: UserEntity[];

  @ManyToMany(() => RoleEntity, { eager: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  // Contact info - firstName, lastName, ...
  @OneToOne(() => UserContactEntity, (userContact) => userContact.user)
  @JoinColumn({ name: 'user_id' })
  contactInfo: UserContactEntity;

  // Contacts (users (friends))
  @ManyToMany(() => UserContactEntity, (user) => user.user)
  @JoinTable({
    name: 'user_contact_info',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'contact_id', referencedColumnName: 'id' },
  })
  contacts: UserContactEntity[];

  @OneToMany(() => PostEntity, (post) => post.user)
  @JoinColumn({ name: 'user_id' })
  posts: PostEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
