import { Logger, Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Service } from 'src/providers/s3/s3.service';

@Injectable()
export class FileService {
  constructor(private readonly s3Service: S3Service) {}

  private readonly log = new Logger(FileService.name);

  async upload(file: Express.Multer.File): Promise<{ url: string }> {
    this.log.debug('upload -- start');
    if (!file) {
      this.log.debug('upload -- invalid argument(s)');
      throw new InternalServerErrorException();
    }
    this.log.debug('upload -- success');
    return await this.s3Service.upload(file);
  }
}
