import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserEntity } from 'src/module/user/user.entity';
import { SaveRoomDto } from '../dto/saveRoom.dto';
import { RoomEntity } from '../entity/room.entity';
import { RoomRepository } from '../repository/room.repository';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}
  private readonly log = new Logger(RoomService.name);

  async create(user: UserEntity, dto: SaveRoomDto): Promise<RoomEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    this.log.debug('create -- success');
    return;
  }

  async getById(user: UserEntity, id: number): Promise<RoomEntity> {
    this.log.debug('getById -- start');
    if (!id || !user.id) {
      this.log.debug('getById -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const room = await this.roomRepository.findById(user.id, id);
    if (!room || room.isDeleted) {
      this.log.debug('getById -- room not found');
      throw new InternalServerErrorException('room not found');
    }

    this.log.debug('getById -- success');
    return room;
  }

  async getAll(user: UserEntity): Promise<RoomEntity[]> {
    this.log.debug('getAll -- start');
    const { id } = user;
    if (!id) {
      this.log.error('getAll -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const rooms = await this.roomRepository.findAll(user.id);
    if (!rooms) {
      this.log.debug('getAll -- room is not available');
      throw new InternalServerErrorException('room is not available');
    }
    this.log.debug('getAll -- success');
    return rooms;
  }
}
