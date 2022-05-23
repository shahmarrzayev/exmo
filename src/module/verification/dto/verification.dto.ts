import { VerificationEntity } from './../verification.entity';

export class VerificationDto {
  id: number;
  phoneNumber: string;
  code: string;
  expirationDate: Date;

  public static fromEntity(entity: VerificationEntity): VerificationDto {
    if (!entity) return null;
    const dto = new VerificationDto();
    dto.id = entity.id;
    dto.phoneNumber = entity.phoneNumber;
    dto.expirationDate = entity.expirationDate;
    return dto;
  }
}
