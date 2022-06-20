import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { IRequest } from '../../auth/interfaces/request.interface';
import { RoomDto } from '../dto/room.dto';
import { SaveRoomDto } from '../dto/saveRoom.dto';
import { EPermission } from 'src/module/role/enum/permission.enum';
import { Permissions } from 'src/module/auth/decorator/permission.decorator';

@Controller('/api/room/')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/')
  @Permissions(EPermission.USER_READ)
  async create(@Req() req: IRequest, @Body() dto: SaveRoomDto): Promise<RoomDto> {
    const room = await this.roomService.create(req.user, dto);
    return RoomDto.fromEntity(room);
  }

  @Get('/')
  @Permissions(EPermission.USER_READ)
  async getAll(@Req() req: IRequest): Promise<RoomDto[]> {
    const rooms = await this.roomService.getAll(req.user);
    return rooms.map(RoomDto.fromEntity);
  }

  @Get('/:id')
  @Permissions(EPermission.USER_READ)
  async getById(@Req() req: IRequest, @Param('id') id: number): Promise<RoomDto> {
    const room = await this.roomService.getById(req.user, id);
    return RoomDto.fromEntity(room);
  }
}
