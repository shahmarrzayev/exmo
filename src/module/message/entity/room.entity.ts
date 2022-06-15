import { MessageEntity } from './message.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToMany(() => MessageEntity, { eager: true })
  @JoinTable({
    name: 'rooms_messages',
    joinColumn: { name: 'room_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'message_id', referencedColumnName: 'id' },
  })
  messages: MessageEntity[];
}
