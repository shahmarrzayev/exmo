import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { decrypt } from 'src/common/cryption';
import { UserEntity } from 'src/module/user/user.entity';
import { SaveRoomDto } from '../dto/saveRoom.dto';
import { RoomEntity } from '../entity/room.entity';
import { MessageRepository } from '../repository/message.repository';
import { RoomRepository } from '../repository/room.repository';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private messageRepository: MessageRepository,
  ) {}
  private readonly log = new Logger(RoomService.name);

  async create(user: UserEntity, dto: SaveRoomDto): Promise<RoomEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    if (await this.existsRoom(user.id, dto.to)) {
      this.log.debug('create -- room already exists');
      throw new InternalServerErrorException('room already exists');
    }

    const entity = SaveRoomDto.toEntity(dto);
    entity.from = user.id;

    const savedRoom = await this.roomRepository.save(entity);
    if (!savedRoom) {
      this.log.debug('create -- room could not saved');
      throw new InternalServerErrorException('room could not saved');
    }

    this.log.debug('create -- success');
    return savedRoom;
  }

  async getById(user: UserEntity, id: number): Promise<RoomEntity> {
    this.log.debug('getById -- start');
    if (!id || !user) {
      this.log.debug('getById -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const room = await this.roomRepository.findById(id);
    if (!room || room.isDeleted) {
      this.log.debug('getById -- room not found');
      throw new InternalServerErrorException('room not found');
    }

    const { messages } = room || {};
    for (let i = 0; i < messages.length; i++) {
      messages[i].message = decrypt(messages[i].message);
    }

    room.messages = messages;
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

  async existsRoom(from: number, to: number): Promise<boolean> {
    if (!from || !to) {
      throw new InternalServerErrorException('invalid argument(s)');
    }
    const room = await this.roomRepository.findByToId(from, to);
    if (!room) return false;

    return true;
  }
}
