import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { EGender } from '../user.enum';

@Entity('users_contact_info')
export class UserContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  username: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ name: 'last_seen' })
  lastSeen: Date;

  @Column()
  gender: EGender;

  @OneToOne(() => UserEntity, (user) => user.contactInfo)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
