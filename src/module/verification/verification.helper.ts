import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationHelper {
  generateCode(): string {
    return (Math.random() * (1e6 - 111111) + 111111).toString();
  }
}
