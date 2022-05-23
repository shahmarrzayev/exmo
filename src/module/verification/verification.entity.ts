import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('verification_codes')
export class VerificationEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'expiration_date' })
  expirationDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
