import { AddManyContactsDto } from './../dto/user/addManyContacts.dto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

import { UserHelper } from '../user.helper';
import { UserEntity } from '../entity/user.entity';
import { SaveUserDto } from '../dto/user/saveUser.dto';
import { ContactService } from './contact.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userHelper: UserHelper,
    private readonly userRepository: UserRepository,
    private readonly contactService: ContactService,
  ) {}

  private readonly log = new Logger(UserService.name);

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

  async getByPhone(phoneNumber: string): Promise<UserEntity> {
    if (!phoneNumber) {
      this.log.warn('getByPhone -- invalid argument(s)');
      throw new InternalServerErrorException();
    }
    const user = await this.userRepository.findByPhone(phoneNumber);
    if (!user) {
      this.log.debug('getByPhone -- user not found');
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async getWithContactByPhone(phoneNumber: string): Promise<UserEntity> {
    if (!phoneNumber) {
      this.log.warn('getByPhone -- invalid argument(s)');
      throw new InternalServerErrorException();
    }
    const user = await this.userRepository.findWithContactByPhone(phoneNumber);
    if (!user) {
      this.log.debug('getByPhone -- user not found');
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async addManyContacts(user: UserEntity, dto: AddManyContactsDto): Promise<UserEntity> {
    this.log.debug('addManyContacts -- start');
    if (!dto || !user) {
      this.log.debug('addManyContacts -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const users = await this.userRepository.findManyWithContactsByPhoneNumbers(dto.phoneNumbers);
    console.log('users', users);
    const usersIds: number[] = [1];

    const contacts = await this.contactService.getManyByUsersIds(usersIds);
    console.log('contacts -- ', contacts);
    if (!contacts || !contacts.length) {
      this.log.debug('addManyContacts -- no contacts found');
      throw new InternalServerErrorException('no contacts found');
    }

    // const entity = { ...user, contacts };
    // const updatedUser = await this.userRepository.save(entity);
    // console.log('updatedUser -- ', updatedUser);
    // if (!updatedUser) {
    //   this.log.debug('addManyContacts -- could not save user');
    //   throw new InternalServerErrorException('could not save user');
    // }
    // this.log.debug('addManyContacts -- success');
    return users.at(0);
  }

  async update(user: UserEntity, dto: SaveUserDto): Promise<UserEntity> {
    this.log.debug('update -- start');
    if (!dto || !user) {
      this.log.debug('update -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    let updatedEntity = { ...user, ...SaveUserDto.toEntity(dto) };
    updatedEntity = await this.userRepository.save(updatedEntity);
    if (!updatedEntity) {
      this.log.warn('update -- could not save user');
      throw new InternalServerErrorException('Could not update user');
    }
    this.log.debug('update -- success');
    return updatedEntity;
  }

  async save(
    phoneNumber: string,
    verificationCode: string,
    verificationCodeExpDate: Date,
  ): Promise<UserEntity> {
    this.log.debug('save -- start');
    if (!phoneNumber || !verificationCode || !verificationCodeExpDate) {
      this.log.warn('save -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
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
}
