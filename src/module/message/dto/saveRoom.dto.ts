import { RoomEntity } from '../entity/room.entity';

export class SaveRoomDto {
  to: number;
  messageIds: number[];
  public static toEntity(dto: SaveRoomDto): RoomEntity {
    const entity = new RoomEntity();
    entity.to = dto.to;
    return entity;
  }
}
