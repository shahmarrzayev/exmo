import { CreateVerificationCodeDto } from './dto/createVerificationCode.dto';
import { VerificationDto } from './dto/verification.dto';
import { VerificationService } from './verification.service';
import { Controller, Post, Body } from '@nestjs/common';
import { CheckVerificationCodeDto } from './dto/checkVerificationCode.dto';
import { AuthService } from '../auth/auth.service';

@Controller('api/verification')
export class VerificationController {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly authService: AuthService,
  ) {}

  @Post('/get-code')
  async sendVerificationCode(@Body() dto: CreateVerificationCodeDto): Promise<VerificationDto> {
    const verification = await this.verificationService.sendVerificationCode(dto);
    return VerificationDto.fromEntity(verification);
  }

  @Post('/check-code')
  async checkVerificationCode(
    @Body() dto: CheckVerificationCodeDto,
  ): Promise<{ access_token: string }> {
    // const user = await this.verificationService.checkVerificationCode(dto);
    // return this.authService.login(user);
    return await this.verificationService.checkVerificationCode(dto);
  }
}
