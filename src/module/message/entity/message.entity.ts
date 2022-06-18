import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  roomId: number;

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

  @ManyToOne(() => RoomEntity)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  room: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
