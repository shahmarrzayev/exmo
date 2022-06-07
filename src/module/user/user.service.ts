import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';

import { UserHelper } from './user.helper';
import { UserEntity } from './user.entity';
import { SaveUserDto } from './dto/saveUser.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userHelper: UserHelper,
    private readonly userRepository: UserRepository,
  ) {}

  private readonly log = new Logger(UserService.name);

  async save(
    phoneNumber: string,
    verificationCode: string,
    verificationCodeExpDate: Date,
  ): Promise<UserEntity> {
    this.log.debug('save -- start');
    if (!phoneNumber || !verificationCode || !verificationCodeExpDate) {
      this.log.warn('save -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    let entity = await this.userRepository.findByPhone(phoneNumber);
    entity = { ...entity, phoneNumber, verificationCode, verificationCodeExpDate };

    const savedUser = await this.userRepository.save(entity);
    if (!savedUser) {
      this.log.debug('save -- could not save user');
      throw new InternalServerErrorException();
    }
    this.log.debug('save -- success');
    return savedUser;
  }

  async getByPhone(phoneNumber: string): Promise<UserEntity> {
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
    const user = await this.userRepository.findById(id);
    if (!user) {
      this.log.debug('getById -- user not found');
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: number, dto: SaveUserDto): Promise<any> {
    this.log.debug('update -- start');
    if (!dto) {
      this.log.debug('update -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      this.log.debug('update -- user not found');
      throw new NotFoundException('User not found');
    }

    if (user.username !== dto.username && (await this.usernameExists(dto.username))) {
      this.log.debug('update -- username already in use');
      throw new ConflictException('Username already in use');
    }

    if (user.refferalCode && dto.refferalCode) {
      this.log.debug('update -- refferal code exists, cannot be changed');
      throw new ConflictException('Refferal code exists');
    }

    let updatedEntity = { ...user, ...SaveUserDto.toEntity(dto) };
    console.log(updatedEntity.birthDate);
    updatedEntity = await this.userRepository.save(updatedEntity);
    if (!updatedEntity) {
      this.log.warn('update -- could not save user');
      throw new InternalServerErrorException('Could not update user');
    }
    this.log.debug('update -- success');
    return updatedEntity;
  }

  async usernameExists(username: string): Promise<boolean> {
    const exists = await this.userRepository.findByUsername(username);
    return !!exists;
  }
}

// 123456
