import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  message: string;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column({ name: 'media_url' })
  mediaUrl: string;

  @Column({ name: 'is_read' })
  isRead: boolean;

  @Column('int', { name: 'deleted_by', array: true })
  deletedBy: number[];

  @ManyToOne(() => RoomEntity, (r) => r.messages)
  @JoinColumn({ name: 'room_id' })
  roomId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
