import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendVerificationCodeDto } from './dto/sendVerificationCode.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async sendVerificationCode(
    @Body() dto: SendVerificationCodeDto,
  ): Promise<{ verificationCodeExpDate: string }> {
    return await this.authService.sendVerificationCode(dto.phoneNumber);
  }
}
