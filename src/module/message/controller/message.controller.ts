import { SaveMessageDto } from './../dto/saveMessage.dto';
import { Controller, Post, Body, Req, Param, Put } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { MessageDto } from '../dto/message.dto';
import { IRequest } from '../../auth/interfaces/request.interface';

@Controller('api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/create')
  async create(@Req() req: IRequest, @Body() dto: SaveMessageDto): Promise<MessageDto> {
    const message = await this.messageService.create(dto);
    return MessageDto.fromEntity(message);
  }

  @Put('/')
  async update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() dto: SaveMessageDto,
  ): Promise<MessageDto> {
    const message = await this.messageService.update(id, req.user, dto);
    return MessageDto.fromEntity(message);
  }

  // @Delete('/:id')
  // async delete(@Req() req: IRequest, @Param('id') id: string): Promise<MessageDto> {
  //   const message = await this.messageService.delete(req.user);
  //   return message;
  // }
}
