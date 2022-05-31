import { FileRepository } from './file.repository';
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './service/file.service';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [FileService, FileRepository],
  exports: [FileService],
})
export class FileModule {}
