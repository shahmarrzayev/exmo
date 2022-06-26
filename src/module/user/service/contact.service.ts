import { SaveContactDto } from './../dto/contact/saveContact.dto';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ContactEntity } from '../entity/contact.entity';
import { UserEntity } from '../entity/user.entity';
import { ContactRepository } from '../repository/contact.repository';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  private readonly log = new Logger(ContactService.name);

  async get(user: UserEntity): Promise<ContactEntity> {
    this.log.debug('get -- start');
    if (!user) {
      this.log.debug('get -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }
    const contact = await this.contactRepository.findByUserId(user.id);
    this.log.debug('get -- success');
    return contact;
  }

  async getManyByUsersIds(userIds: number[]): Promise<ContactEntity[]> {
    this.log.debug('getAllByPhone -- start');
    if (!userIds || !userIds.length) {
      this.log.debug('getAllByPhone -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const contacts = await this.contactRepository.findAllByUsersIds(userIds);
    if (!contacts || !contacts.length) {
      this.log.debug('getAllByPhone -- contacts not found');
      throw new InternalServerErrorException('contacts not found');
    }
    this.log.debug('getAllByPhone -- success');
    return;
  }

  async save(dto: SaveContactDto, user: UserEntity): Promise<ContactEntity> {
    this.log.debug('create -- start');
    if (!dto || !user) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    let entity: ContactEntity;
    if (await this.existsContact(user.id)) {
      entity = await this.contactRepository.findByUserId(user.id);
    }

    if (entity?.referralCode && dto.referralCode) {
      this.log.debug('create -- refferal code exists, cannot be changed');
      throw new InternalServerErrorException('refferal code exists, cannot be changed');
    }

    entity = { ...entity, ...SaveContactDto.toEntity(dto), user };

    const savedContact = await this.contactRepository.save(entity);
    if (!savedContact) {
      this.log.debug('create -- could not save contact');
      throw new InternalServerErrorException('could not save contact');
    }
    this.log.debug('create -- success');
    return savedContact;
  }

  async existsContact(userId: number): Promise<boolean> {
    this.log.debug('existsContact -- start');
    if (!userId) {
      this.log.debug('existsContact -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }
    const exists = await this.contactRepository.findByUserId(userId);
    this.log.debug('existsContact -- success');
    return !!exists;
  }
}
