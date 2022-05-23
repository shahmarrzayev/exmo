import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { VerificationController } from './verification.controller';
import { VerificationEntity } from './verification.entity';
import { VerificationHelper } from './verification.helper';
import { VerificationRepository } from './verification.repository';
import { VerificationService } from './verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationEntity]), AuthModule],
  controllers: [VerificationController],
  providers: [VerificationService, VerificationRepository, VerificationHelper],
  exports: [VerificationService],
})
export class VerificationModule {}
