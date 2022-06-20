import { MessageEntity } from './../entity/message.entity';

export class MessageDto {
  message: string;
  from: number;
  to: number;
  mediaUrl: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;

  public static fromEntity(entity: MessageEntity): MessageDto {
    const dto = new MessageDto();
    dto.message = entity.message;
    dto.from = entity.from;
    dto.to = entity.to;
    dto.isRead = entity.isRead;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
