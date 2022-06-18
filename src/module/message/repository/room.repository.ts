import { RoomEntity } from './../entity/room.entity';
import { GenericRepository } from './../../../common/repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomRepository extends GenericRepository {
  constructor(@InjectRepository(RoomEntity) private repository: Repository<RoomEntity>) {
    super();
  }

  async findById(userId: number, roomId: number): Promise<RoomEntity> {
    if (!userId || !roomId) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.messages', 'messages')
        .where('room.id = :roomId', { roomId })
        .andWhere('room.from = :userId', { userId })
        .getOne(),
    );
  }

  async findAll(from: number): Promise<RoomEntity[]> {
    if (!from) return null;
    return await this.runQuery(() =>
      this.repository.createQueryBuilder('room').where('room.from = :from', { from }).getOne(),
    );
  }
}
