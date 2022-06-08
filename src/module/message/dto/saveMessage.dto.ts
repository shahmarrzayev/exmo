import { MessageEntity } from './../entity/message.entity';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class SaveMessageDto {
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsOptional()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsNumber()
  from: number;

  @IsNotEmpty()
  @IsNumber()
  to: number;

  @IsOptional()
  @IsString()
  mediaUrl: string;

  @IsOptional()
  @IsBoolean()
  isRead: boolean;

  @IsArray()
  @IsInt({ each: true })
  deletedBy: number[];

  public static toEntity(dto: SaveMessageDto, encryptedMessage: string): MessageEntity {
    if (!dto || !encryptedMessage) return null;
    const entity = new MessageEntity();
    entity.roomId = dto.roomId;
    entity.message = encryptedMessage;
    entity.from = dto.from;
    entity.to = dto.to;
    entity.mediaUrl = dto.mediaUrl;
    entity.isRead = dto.isRead;
    entity.deletedBy = dto.deletedBy;
    return entity;
  }
}
