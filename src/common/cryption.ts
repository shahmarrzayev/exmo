import { getConfig } from 'src/common/util';
import { AES, enc } from 'crypto-js';
import { EConfig } from './config.enum';

export const encrypt = (text: string): string => {
  const encryptedText = AES.encrypt(text, getConfig(EConfig.ENCRYPTION_PASSWORD));
  return encryptedText.toString();
};

export const decrypt = (encryptedText: string): string => {
  const decryptedText = AES.decrypt(encryptedText, getConfig(EConfig.ENCRYPTION_PASSWORD));
  return decryptedText.toString(enc.Utf8);
};
