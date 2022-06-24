import { UserEntity } from '../../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../../user/user.service';
import { AuthService } from './../auth.service';
import { Test } from '@nestjs/testing';
import { AuthHelper } from '../auth.helper';

let service: AuthService;

describe('AuthService', () => {
  beforeEach(async () => {
    const fakeUserService: Partial<UserService> = {
      create: (phoneNumber: string, verificationCode: string, verificationCodeExpDate: Date) =>
        Promise.resolve({ phoneNumber, verificationCode, verificationCodeExpDate } as UserEntity),
      getByPhone: () => Promise.resolve({} as UserEntity),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthHelper,
        JwtService,
        UserEntity,
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
});
