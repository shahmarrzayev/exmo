import { MessageEntity } from './../entity/message.entity';

export class MessageDto {
  roomId: number;
  from: number;
  to: number;
  mediaUrl: string;
  isRead: boolean;
  deletedBy: number[];

  public static fromEntity(entity: MessageEntity): MessageDto {
    const dto = new MessageDto();
    dto.roomId = entity.roomId;
    dto.from = entity.from;
    dto.to = entity.to;
    dto.isRead = entity.isRead;
    dto.deletedBy = entity.deletedBy;
    return dto;
  }
}
