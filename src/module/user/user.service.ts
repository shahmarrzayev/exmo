import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserHelper } from './user.helper';
import { PhoneNumberDto } from './dto/public/phoneNumber.dto';
import { getConfig } from 'src/common/util';
import { EConfig } from 'src/common/config.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly userHelper: UserHelper,
    private readonly userRepository: UserRepository,
  ) {}

  private readonly log = new Logger(UserService.name);

  async getCode(dto: PhoneNumberDto): Promise<UserEntity> {
    this.log.debug('getCode -- start');
    const { phoneNumber } = dto || {};
    if (!dto || !phoneNumber) {
      this.log.debug('getCode -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const authCode = Number('123456');
    const authCodeExpDate = Date.now() + getConfig(EConfig.AUTH_CODE_EXPIRATION_TIME) * 1000;

    if (!authCode || !authCodeExpDate) {
      this.log.debug('getCode -- ');
      throw new InternalServerErrorException();
    }

    const user = this.userRepository.findByPhone(phoneNumber);
    if (!user) {
      this.log.debug('getCode -- user not found');
    }

    this.log.debug('getCode -- success');
    return;
  }
}
