import { UserEntity } from './../../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToMany(() => UserEntity)
  @JoinColumn({ name: 'room_id' })
  roomId: number;

  @Column()
  message: string;

  @ManyToOne(() => UserEntity)
  from: number;

  @ManyToOne(() => UserEntity)
  to: number;

  @Column({ name: 'media_url' })
  mediaUrl: string;

  @Column({ name: 'is_read' })
  isRead: boolean;

  @Column('text', { name: 'deleted_by', array: true })
  deletedBy: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
