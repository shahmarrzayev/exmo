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
import { ContactEntity } from './contact.entity';
import { StatusEntity } from './status.entity';

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

  // Contacts (users (friends))
  @ManyToMany(() => ContactEntity, { eager: true })
  @JoinTable({
    name: 'users_contacts',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'contact_id', referencedColumnName: 'id' },
  })
  contacts: ContactEntity[];

  // Contact info - firstName, lastName, ...
  @OneToOne(() => ContactEntity, (contact) => contact.id)
  @JoinColumn({ name: 'id' })
  contact: ContactEntity;

  @OneToMany(() => PostEntity, (post) => post.userId)
  @JoinColumn({ name: 'user_id' })
  posts: PostEntity[];

  @OneToMany(() => StatusEntity, (status) => status.userId)
  @JoinColumn({ name: 'user_id' })
  statuses: StatusEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
