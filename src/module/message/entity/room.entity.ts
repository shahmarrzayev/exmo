import { MessageEntity } from './message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
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

  @OneToMany(() => MessageEntity, (m) => m.roomId)
  @JoinColumn({ name: 'room_id' })
  messages: MessageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
