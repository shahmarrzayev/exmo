import { Module } from '@nestjs/common';
import { S3Module } from 'src/providers/s3/s3.module';
import { FileController } from './file.controller';
import { FileService } from './service/file.service';

@Module({
  imports: [S3Module],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
