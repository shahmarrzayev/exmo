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
}
