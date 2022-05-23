import { CreateVerificationCodeDto } from './dto/createVerificationCode.dto';
import { VerificationDto } from './dto/verification.dto';
import { VerificationService } from './verification.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('verification/get-code')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  async getVerificationCode(@Body() dto: CreateVerificationCodeDto): Promise<VerificationDto> {
    const code = await this.verificationService.getVerificationCode(dto);
    return VerificationDto.fromEntity(code);
  }
}
