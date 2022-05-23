import { EConfig } from 'src/common/config.enum';
import { getConfig } from 'src/common/util';
import { VerificationHelper } from './verification.helper';
import { VerificationRepository } from './verification.repository';
import { VerificationEntity } from './verification.entity';
import { CreateVerificationCodeDto } from './dto/createVerificationCode.dto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { checkVerificationCodeDto } from './dto/checkVerificationCode.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class VerificationService {
  constructor(
    private readonly authService: AuthService,
    private readonly verificationRepository: VerificationRepository,
    private readonly verificationHelper: VerificationHelper,
  ) {}

  private readonly log = new Logger(VerificationService.name);

  async sendVerificationCode(dto: CreateVerificationCodeDto): Promise<VerificationEntity> {
    this.log.debug('sendVerificationCode -- start');
    const { phoneNumber } = dto || {};
    if (!phoneNumber) {
      this.log.debug('sendVerificationCode -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const code = this.verificationHelper.generateCode();
    const expirationDate = new Date(
      Date.now() + getConfig(EConfig.VERIFICATION_CODE_EXPIRATION_TIME) * 1000,
    );

    let verification = await this.verificationRepository.findByPhone(phoneNumber);
    console.log(verification);
    if (verification) {
      verification.code = code;
      verification.expirationDate = expirationDate;
    } else {
      verification = CreateVerificationCodeDto.toEntity(dto, code, expirationDate);
    }

    const savedVerification = await this.verificationRepository.save(verification);
    if (!savedVerification) {
      this.log.warn('sendVerificationCode -- could not save verification');
      throw new InternalServerErrorException();
    }

    this.log.debug('sendVerificationCode -- success');
    return savedVerification;
  }

  async checkVerificationCode(dto: checkVerificationCodeDto): Promise<{ access_token: string }> {
    this.log.debug('checkVerificationCode -- start');
    const { phoneNumber, code } = dto || {};
    if (!phoneNumber || !code) {
      this.log.debug('checkVerificationCode -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const verification = await this.verificationRepository.findByPhone(phoneNumber);
    if (!verification) {
      this.log.debug('checkVerificationCode -- phone number not found');
      throw new InternalServerErrorException();
    }

    const currentDate = new Date(Date.now());
    if (verification.code != code || verification.expirationDate < currentDate) {
      this.log.debug('checkVerificationCode -- verification code is not correct or has expired');
      throw new UnauthorizedException();
    }

    this.log.debug('checkVerificationCode -- success');
    return await this.authService.login(phoneNumber);
  }
}
