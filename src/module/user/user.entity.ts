import { EGender } from './user.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../role/entity/role.entity';
import { PostEntity } from '../post/post.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  username: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ name: 'last_seen' })
  lastSeen: Date;

  @Column()
  gender: EGender;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'is_user', default: true })
  isUser: boolean;

  @Column('int', { array: true, name: 'blocked_list' })
  blockedList: number[];

  @Column()
  image: string;

  @Column()
  refferalCode?: string;

  @Column({ name: 'verification_code' })
  verificationCode: string;

  @Column({ name: 'verification_code_exp_date' })
  verificationCodeExpDate: Date;

  @ManyToMany(() => RoleEntity, { eager: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles?: RoleEntity[];

  @OneToMany(() => PostEntity, (post) => post.userId)
  @JoinColumn({ name: 'user_id' })
  posts: PostEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
