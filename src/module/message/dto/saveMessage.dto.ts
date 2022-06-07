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

  @IsNotEmpty()
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
}
