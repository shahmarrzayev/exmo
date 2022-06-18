import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { IRequest } from '../../auth/interfaces/request.interface';
import { RoomDto } from '../dto/room.dto';

@Controller('/api/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/')
  async create(@Req() req: IRequest): Promise<RoomDto[]> {
    return;
  }

  @Get('/')
  async getAll(@Req() req: IRequest): Promise<RoomDto[]> {
    const rooms = await this.roomService.getAll(req.user);
    return rooms.map(RoomDto.fromEntity);
  }

  @Get('/:id')
  async getById(@Req() req: IRequest, @Param('id') id: number): Promise<RoomDto> {
    const room = await this.roomService.getById(req.user, id);
    return RoomDto.fromEntity(room);
  }
}
