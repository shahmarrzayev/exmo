import { MessageEntity } from './../entity/message.entity';

export class MessageDto {
  roomId: number;
  from: number;
  to: number;
  mediaUrl: string;
  isRead: boolean;
  deletedBy: number[];
  createdAt: Date;
  updatedAt: Date;

  public static fromEntity(entity: MessageEntity): MessageDto {
    const dto = new MessageDto();
    dto.roomId = entity.roomId;
    dto.from = entity.from;
    dto.to = entity.to;
    dto.isRead = entity.isRead;
    dto.deletedBy = entity.deletedBy;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
