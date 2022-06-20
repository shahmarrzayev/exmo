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

  async save(entity: RoomEntity): Promise<RoomEntity> {
    if (!entity) return null;
    return await this.runQuery(() => this.repository.save(entity));
  }

  async findById(id: number): Promise<RoomEntity> {
    if (!id) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.messages', 'message')
        .where('room.id = :id', { id })
        .getOne(),
    );
  }

  async findAll(from: number): Promise<RoomEntity[]> {
    if (!from) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('room')
        .select(['room.id', 'room.from', 'room.to'])
        .where('room.from = :from', { from })
        .getMany(),
    );
  }

  async findByToId(from: number, to: number): Promise<RoomEntity> {
    if (!from || !to) return null;
    return await this.runQuery(() =>
      this.repository
        .createQueryBuilder('room')
        .where('room.from = :from', { from })
        .andWhere('room.to = :to', { to })
        .andWhere('room.is_deleted = false')
        .getOne(),
    );
  }
}
