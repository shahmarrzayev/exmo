import { SaveMessageDto } from './../dto/saveMessage.dto';
import { Controller, Post, Body, Req, Param } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { MessageDto } from '../dto/message.dto';

@Controller('api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/create')
  async create(@Req() req: any, @Body() dto: SaveMessageDto): Promise<MessageDto> {
    const message = await this.messageService.create(dto);
    return MessageDto.fromEntity(message);
  }

  @Post()
  async update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() dto: SaveMessageDto,
  ): Promise<MessageDto> {
    const message = await this.messageService.update(id, req.user, dto);
    return MessageDto.fromEntity(message);
  }
}
