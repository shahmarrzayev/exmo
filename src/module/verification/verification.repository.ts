import { Injectable } from '@nestjs/common';
import { GenericRepository } from './../../common/repository';
import { VerificationEntity } from './verification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VerificationRepository extends GenericRepository {
  constructor(
    @InjectRepository(VerificationEntity) private repository: Repository<VerificationEntity>,
  ) {
    super();
  }

  async findByPhone(phoneNumber: string): Promise<VerificationEntity> {
    const id = 1;
    return await this.runQuery(() => {
      this.repository
        .createQueryBuilder('verification')
        .where('verification.phone_number = :phoneNumber', { phoneNumber })
        .getOne();
    });
  }

  async save(entity: VerificationEntity): Promise<VerificationEntity> {
    if (!entity) return null;
    return await this.runQuery(() => this.repository.save(entity));
  }
}
