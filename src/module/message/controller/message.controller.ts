import { SaveMessageDto } from './../dto/saveMessage.dto';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { Permissions } from 'src/module/auth/decorator/permission.decorator';
import { EPermission } from 'src/module/role/enum/permission.enum';
import { MessageService } from '../service/message.service';
import { MessageDto } from '../dto/message.dto';

@Controller('api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/create')
  @Permissions(EPermission.USER_WRITE)
  async create(@Req() req, @Body() dto: SaveMessageDto): Promise<MessageDto> {
    const message = await this.messageService.create(req.user, dto);
    return MessageDto.fromEntity(message);
  }

  @Post()
  @Permissions(EPermission.PERMISSION_WRITE)
  async update() {}
}
