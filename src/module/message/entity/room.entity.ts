import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id?: number;
}
