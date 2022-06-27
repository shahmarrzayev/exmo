import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { EGender } from '../user.enum';

@Entity('contacts')
export class ContactEntity {
  @PrimaryColumn()
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

  @Column({ name: 'profile_image' })
  profileImage: string;

  @Column({ name: 'referral_code' })
  referralCode: string;

  @OneToOne(() => UserEntity, (user) => user.contact)
  @JoinColumn({ name: 'id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
