import { MessageEntity } from './message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @ManyToMany(() => MessageEntity, { eager: true })
  @JoinTable({
    name: 'rooms_messages',
    joinColumn: { name: 'room_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'message_id', referencedColumnName: 'id' },
  })
  messages: MessageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
