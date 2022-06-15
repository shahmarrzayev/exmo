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

  @Column({ name: 'room_id' })
  roomId: number;

  @Column()
  message: string;

  // @ManyToOne(() => UserEntity)
  @Column()
  from: number;

  // @ManyToOne(() => UserEntity)
  @Column()
  to: number;

  @Column({ name: 'media_url' })
  mediaUrl: string;

  @Column({ name: 'is_read' })
  isRead: boolean;

  @Column('int', { name: 'deleted_by', array: true })
  deletedBy: number[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
