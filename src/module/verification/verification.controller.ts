import { CreateVerificationCodeDto } from './dto/createVerificationCode.dto';
import { VerificationDto } from './dto/verification.dto';
import { VerificationService } from './verification.service';
import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('api/verification/get-code')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  async sendVerificationCode(@Body() dto: CreateVerificationCodeDto): Promise<VerificationDto> {
    const verification = await this.verificationService.sendVerificationCode(dto);
    return VerificationDto.fromEntity(verification);
  }
}
