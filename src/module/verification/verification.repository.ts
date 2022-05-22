import { Injectable } from '@nestjs/common';
import { GenericRepository } from './../../common/repository';
import { VerificationEntity } from './verification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VerificationRepository extends GenericRepository {
  constructor(
    @InjectRepository(VerificationRepository) private repository: Repository<VerificationEntity>,
  ) {
    super();
  }

  async findByPhone(phoneNumber: string): Promise<VerificationEntity> {
    return;
  }
}
