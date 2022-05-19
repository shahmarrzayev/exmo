import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

@Injectable()
export class UserHelper {
  async hashPassword(password: string): Promise<string> {
    if (!password) return null;

    let hashedPassword: string;
    try {
      hashedPassword = await hash(password);
    } catch (error) {
      return null;
    }

    return hashedPassword;
  }

  async verifyPassword(password: string, encryptedPassword: string): Promise<boolean> {
    if (!password || !encryptedPassword) return false;

    let isCorrectPassword: boolean;
    try {
      isCorrectPassword = await verify(encryptedPassword, password);
    } catch (e) {
      return false;
    }

    return isCorrectPassword;
  }
}
