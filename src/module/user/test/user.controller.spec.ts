import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controller/user.public.controller';
import { SaveUserDto } from '../dto/saveUser.dto';
import { UserEntity } from '../user.entity';
import { UserHelper } from '../user.helper';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            save: jest.fn().mockResolvedValue((dto: SaveUserDto) =>
              Promise.resolve({
                ...dto,
              }),
            ),
            get: jest.fn().mockResolvedValue([]),
            getByPhone: jest.fn().mockResolvedValue([]),
            getById: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue((dto: SaveUserDto) =>
              Promise.resolve({
                ...dto,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {});
});
