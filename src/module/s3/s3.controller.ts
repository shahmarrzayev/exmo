import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('/api/file')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<{ url: string }> {
    return await this.s3Service.upload(file);
  }
}
