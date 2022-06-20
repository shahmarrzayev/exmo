import { RoomEntity } from '../entity/room.entity';
import { MessageDto } from './message.dto';

export class RoomDto {
  id: number;
  from: number;
  to: number;
  messages: MessageDto[];

  public static fromEntity(entity: RoomEntity): RoomDto {
    const dto = new RoomDto();
    dto.id = entity.id;
    dto.from = entity.from;
    dto.to = entity.to;
    if (Array.isArray(entity.messages)) dto.messages = entity.messages.map(MessageDto.fromEntity);
    return dto;
  }
}
