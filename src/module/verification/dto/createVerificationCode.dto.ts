import { VerificationEntity } from './../verification.entity';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateVerificationCodeDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  public static toEntity(dto: CreateVerificationCodeDto, code: string, expirationDate: Date) {
    if (!dto || !code || !expirationDate) return null;
    const entity = new VerificationEntity();
    entity.phoneNumber = dto.phoneNumber;
    entity.code = code;
    entity.expirationDate = expirationDate;
    return entity;
  }
}
