// import { getConfig } from './util';
// import { Logger } from '@nestjs/common';
// import { BinaryLike, Cipher, createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
// import { promisify } from 'util';
// import { EConfig } from './config.enum';

// const iv = randomBytes(16);
// const password = 'Password used to generate key';

// export class Encryption {
//   private readonly key: Buffer;
//   private readonly cipher: Cipher;
//   private readonly iv: BinaryLike;
//   private readonly encryptionPassword: string;
//   constructor() {
//     this.iv = randomBytes(16);
//     this.encryptionPassword = getConfig(EConfig.ENCRYPTION_PASSWORD);
//     this.key = async () => (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
//     this.cipher = createCipheriv('aes-256-ctr', this.key, iv);
//   }
//   public static async encrypt(text) {
//     try {
//       const encryptedText = Buffer.concat([this.cipher.update(text), cipher.final()]);
//       return encryptedText;
//     } catch (err) {
//       Logger.error('encrypt -- text could not be encrypted');
//       return null;
//     }
//   }

//   public static async decrypt(encryptedText) {
//     const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
//     const decipher = createDecipheriv('aes-256-ctr', key, iv);
//     const decryptedText = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

//     return decryptedText;
//   }
// }
