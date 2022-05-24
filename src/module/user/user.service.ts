import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';

import { UserHelper } from './user.helper';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userHelper: UserHelper,
    private readonly userRepository: UserRepository,
  ) {}

  private readonly log = new Logger(UserService.name);

  async getByPhone(phoneNumber): Promise<UserEntity> {
    if (!phoneNumber) {
      this.log.warn('getByPhone -- invalid argument(s)');
      throw new InternalServerErrorException();
    }
    const user = await this.userRepository.findByPhone(phoneNumber);
    if (!user) {
      this.log.debug('getByPhone -- user not found');
      throw new NotFoundException();
    }
    return user;
  }

  async getById(id: number): Promise<UserEntity> {
    if (!id) {
      this.log.warn('getById -- invalid argument(s)');
      throw new InternalServerErrorException();
    }
    const user = await this.userRepository.findExtendedById(id);
    if (!user) {
      this.log.debug('getById -- user not found');
      throw new NotFoundException();
    }
    return user;
  }
}

// 123456
