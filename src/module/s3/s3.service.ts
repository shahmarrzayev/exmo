import { S3 } from 'aws-sdk';
import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { getConfig } from 'src/common/util';
import { EConfig } from 'src/common/config.enum';
import { v4 as uuid } from 'uuid';

Injectable();
export class S3Service {
  constructor(
    private readonly s3 = new S3({
      region: getConfig(EConfig.S3_REGION),
      accessKeyId: getConfig(EConfig.S3_ACCESS_KEY_ID),
      secretAccessKey: getConfig(EConfig.S3_SECRET_ACCESS_KEY),
    }),
  ) {}

  private log = new Logger(S3Service.name);

  async upload(file: Express.Multer.File): Promise<{ url: string }> {
    this.log.debug('upload -- start');
    if (!file) {
      this.log.debug('upload -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const { buffer, originalname } = file;
    if (!buffer || !originalname) {
      this.log.debug('upload -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const bucketName = getConfig(EConfig.S3_BUCKET);
    const region = getConfig(EConfig.S3_REGION);
    const urlKey = `${Date.now()}-${uuid()}-${originalname}`;

    try {
      await this.s3
        .putObject({
          Bucket: bucketName,
          Body: buffer,
          Key: urlKey,
          ACL: 'public-read',
        })
        .promise();
    } catch (error) {
      this.log.error(`Error processing the image: ${JSON.stringify(error.message)}`);
      throw new InternalServerErrorException(error.message);
    }

    this.log.debug('upload -- success');
    return { url: `https://${bucketName}.s3.${region}.amazonaws.com/${urlKey}` };
  }
}
