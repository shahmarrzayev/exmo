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

@Entity('contacts')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'contact_first_name' })
  contactFirstName: string;

  @Column({ name: 'contact_last_name' })
  contactLastName: string;

  @Column()
  username: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ name: 'last_seen' })
  lastSeen: Date;

  @Column()
  gender: EGender;

  @Column({ name: 'profile_image' })
  profileImage: string;

  @Column({ name: 'refferal_code' })
  refferalCode: string;

  @OneToOne(() => UserEntity, (user) => user.contactInfo)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
