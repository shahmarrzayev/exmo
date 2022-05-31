import { S3 } from 'aws-sdk';
import { Logger, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EConfig } from 'src/common/config.enum';
import { getConfig } from 'src/common/util';

@Injectable()
export class FileService {
  constructor() {}

  private readonly log = new Logger(FileService.name);

  async uploadFile(file: Express.Multer.File) {
    this.log.debug('uploadFile -- start');
    if (!file || !file.originalname) {
      this.log.debug('uploadFile -- ');
      throw new InternalServerErrorException();
    }

    let result;
    try {
      const s3 = new S3({
        accessKeyId: getConfig(EConfig.S3_ACCESS_KEY_ID),
        secretAccessKey: getConfig(EConfig.S3_SECRET_ACCESS_KEY),
      });

      result = s3.upload({
        Bucket: getConfig(EConfig.S3_BUCKET_NAME),
        Key: file.originalname,
        Body: file,
      });
    } catch (err) {
      this.log.error(err);
      throw new InternalServerErrorException();
    }
    this.log.debug('uploadFile -- success');
    return result;
  }
}
