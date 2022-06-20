import { MessageEntity } from './../entity/message.entity';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';

export class SaveMessageDto {
  @IsNotEmpty()
  @IsNumber()
  from: number;

  @IsNotEmpty()
  @IsNumber()
  to: number;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  mediaUrl: string;

  @IsOptional()
  @IsBoolean()
  isRead: boolean;

  public static toEntity(dto: SaveMessageDto, encryptedMessage?: string): MessageEntity {
    if (!dto || !encryptedMessage) return null;
    const entity = new MessageEntity();
    entity.from = dto.from;
    entity.to = dto.to;
    entity.message = encryptedMessage || dto.message;
    entity.mediaUrl = dto.mediaUrl;
    entity.isRead = dto.isRead;
    return entity;
  }
}
