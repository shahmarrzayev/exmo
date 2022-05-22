import { EConfig } from 'src/common/config.enum';
import { getConfig } from 'src/common/util';
import { VerificationHelper } from './verification.helper';
import { VerificationRepository } from './verification.repository';
import { VerificationEntity } from './verification.entity';
import { CreateVerificationCodeDto } from './dto/createVerificationCode.dto';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class VerificationService {
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly verificationHelper: VerificationHelper,
  ) {}

  private readonly log = new Logger(VerificationService.name);

  async getVerificationCode(dto: CreateVerificationCodeDto): Promise<VerificationEntity> {
    this.log.debug('getVerificationCode -- start');
    const { phoneNumber } = dto || {};
    if (!dto || !phoneNumber) {
      this.log.debug('getVerificationCode -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const code = this.verificationHelper.generateCode();
    const expirationDate = new Date(
      Date.now() + getConfig(EConfig.VERIFICATION_CODE_EXPIRATION_TIME) * 1000,
    );

    let verification = await this.verificationRepository.findByPhone(phoneNumber);
    if (verification) {
      verification.code = code;
      verification.expirationDate = expirationDate;
    } else {
      verification = CreateVerificationCodeDto.toEntity(dto, code, expirationDate);
    }

    const savedVerification = await this.verificationRepository.save(verification);
    if (!savedVerification) {
      this.log.warn('getVerificationCode -- could not save verification');
      throw new InternalServerErrorException();
    }

    this.log.debug('getVerificationCode -- success');
    return savedVerification;
  }

  async sendVerificationCode() {}
}
