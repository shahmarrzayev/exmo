import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserContactEntity } from '../entity/contact.entity';

@Injectable()
export class ContactRepository {
  constructor(
    @InjectRepository(UserContactEntity) private contactRepository: Repository<UserContactEntity>,
  ) {}
}
