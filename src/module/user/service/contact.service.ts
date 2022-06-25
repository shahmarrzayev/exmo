import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SaveContactDto } from '../dto/saveContact.dto';
import { ContactEntity } from '../entity/contact.entity';
import { UserEntity } from '../entity/user.entity';
import { ContactRepository } from '../repository/contact.repository';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  private readonly log = new Logger(ContactService.name);

  async save(dto: SaveContactDto, user: UserEntity): Promise<ContactEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    let entity;
    if (await this.existsContact(user.id)) {
      entity = await this.contactRepository.findByUserId(user.id);
    }

    if (entity?.refferalCode) {
      this.log.debug('create -- ');
      throw new InternalServerErrorException('already exists');
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
