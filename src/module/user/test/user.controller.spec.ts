import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controller/user.controller';
import { SaveUserDto } from '../dto/user/saveUser.dto';
import { UserEntity } from '../entity/user.entity';
import { UserHelper } from '../user.helper';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../service/user.service';
import httpMocks from 'node-mocks-http';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    get: jest.fn().mockReturnValue([new UserEntity()]),
    getByPhone: jest.fn().mockResolvedValue([]),
    getById: jest.fn().mockResolvedValue([]),
    create: jest
      .fn()
      .mockImplementation(
        (phoneNumber: string, verificationCode: string, verificationCodeExpDate: Date) => ({
          verificationCodeExpDate: Date.now(),
        }),
      ),
    update: jest.fn().mockResolvedValue([]),
  };

  const mockUserEntity = {
    id: 1,
    firstName: 'firstName',
    lastName: 'lastName',
    birthDate: new Date(Date.now()),
  } as UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('get', () => {});
});
