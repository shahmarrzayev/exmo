import { FileService } from './service/file.service';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<{ url: string }> {
    return await this.fileService.upload(file);
  }
}
