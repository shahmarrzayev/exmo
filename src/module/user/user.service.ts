import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { SaveUserDto } from './dto/internal/saveUser.dto';
import { RoleService } from '../role/service/role.service';
import { OrganizationEntity } from '../organization/organization.entity';
import { UserHelper } from './user.helper';
import { EntityManager } from 'typeorm';
import { ERole } from '../role/enum/role.enum';
import { FindUsersFilterDto } from './dto/findUsersFilter.dto';
import { ChangeOwnPasswordDto } from './dto/changeOwnPassword.dto';
import { UpdateUserOrgDto } from './dto/org/updateUser.org.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userHelper: UserHelper,
    private readonly userRepository: UserRepository,
  ) {}

  private readonly log = new Logger(UserService.name);

  async changePassword(id: number, dto: ChangeOwnPasswordDto): Promise<void> {
    this.log.debug('changePassword -- start');
    const { currentPass, newPass } = dto || {};
    if (!id || !currentPass || !newPass) {
      this.log.debug('changePassword -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    if (currentPass === newPass) return;

    const user = await this.userRepository.findExtendedById(id);
    if (!user) {
      this.log.debug('changePassword -- user not found');
      throw new InternalServerErrorException();
    }

    const [correctPass, encryptedNewPass] = await Promise.all([
      this.userHelper.verifyPassword(currentPass, user.password),
      this.userHelper.hashPassword(newPass),
    ]);

    if (!correctPass) {
      this.log.debug('changePassword -- password is not correct');
      throw new UnauthorizedException();
    }

    user.password = encryptedNewPass;
    user.passwordLastUpdatedAt = new Date();
    const entity = await this.userRepository.save(user);
    if (!entity) {
      this.log.warn('changePassword -- could not save user');
      throw new InternalServerErrorException();
    }
    this.log.debug('changePassword -- success');
  }

  async create(
    dto: SaveUserDto,
    organization: OrganizationEntity,
    entityManager?: EntityManager,
    roleTitle?: ERole,
  ): Promise<UserEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.warn('create -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    if (await this.emailExists(dto.email)) {
      this.log.debug('create -- email is in use');
      throw new ConflictException('Email is in use');
    }

    const encryptedPassword = await this.userHelper.hashPassword(dto.password);
    if (!encryptedPassword) {
      this.log.warn('create -- could not encrypt password');
      throw new InternalServerErrorException();
    }

    const entity = SaveUserDto.toEntity(dto, encryptedPassword);
    entity.organization = organization;
    entity.roles = roleTitle
      ? [await this.roleService.getByTitle(roleTitle)]
      : await this.roleService.getAllByIds(dto.roleIds);

    const user = entityManager
      ? await entityManager.save(entity)
      : await this.userRepository.save(entity);
    if (!user) {
      this.log.warn('create -- could not save user');
      throw new InternalServerErrorException('Could not save user');
    }

    this.log.debug('create -- success');
    return user;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    if (!email) {
      this.log.warn('getByEmail -- invalid argument(s)');
      throw new InternalServerErrorException();
    }
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.log.debug('getByEmail -- user not found');
      throw new NotFoundException();
    }
    return user;
  }

  async getById(id: number): Promise<UserEntity> {
    if (!id) {
      this.log.warn('getById -- invalid argument(s)');
      throw new InternalServerErrorException();
    }
    const user = await this.userRepository.findExtendedById(id);
    if (!user) {
      this.log.debug('getById -- user not found');
      throw new NotFoundException();
    }
    return user;
  }

  async getAll(filter: FindUsersFilterDto): Promise<UserEntity[]> {
    if (!filter) return [];

    return (await this.userRepository.findAll(filter)) || [];
  }

  async getByOrganizationId(id: number): Promise<UserEntity[]> {
    if (!id) {
      this.log.warn('getByOrganizationId -- invalid arg(s)');
      throw new InternalServerErrorException();
    }

    const users = await this.userRepository.findManyByOrganizationId(id);
    if (!users) {
      this.log.warn('getByOrganizationId -- could not get users');
      throw new InternalServerErrorException();
    }

    return users;
  }

  async update(id: number, dto: SaveUserDto): Promise<UserEntity> {
    this.log.debug('update -- start');
    if (!dto) {
      this.log.warn('update -- invalid argument(s)');
      throw new InternalServerErrorException();
    }

    const user = await this.userRepository.findExtendedById(id);
    if (!user) {
      this.log.debug('update -- user not found');
      throw new NotFoundException('User not found');
    }

    if (user.email !== dto.email && (await this.emailExists(dto.email))) {
      this.log.debug('update -- email already in use');
      throw new ConflictException('Email already in use');
    }

    let updatedEntity = { ...user, ...SaveUserDto.toEntity(dto, user.password) };
    updatedEntity.roles = await this.roleService.getAllByIds(dto.roleIds);

    updatedEntity = await this.userRepository.save(updatedEntity);
    if (!updatedEntity) {
      this.log.warn('update -- could not save user');
      throw new InternalServerErrorException('Could not update user');
    }

    this.log.debug('update -- success');
    return updatedEntity;
  }

  async updateByOrg(id: number, orgId: number, dto: UpdateUserOrgDto): Promise<UserEntity> {
    if (!id || !orgId || !dto) {
      this.log.warn('updateByOrg -- invalid arg(s)');
      throw new InternalServerErrorException();
    }

    const user = await this.userRepository.findExtendedById(id);
    if (!user) {
      this.log.warn('updateByOrg -- user not found');
      throw new NotFoundException();
    }
    if (user.organization.id !== orgId) {
      this.log.warn('updateByOrg -- can only update own org');
      throw new UnauthorizedException();
    }

    let updatedUser = { ...user, ...UpdateUserOrgDto.toEntity(dto) };
    updatedUser = await this.userRepository.save(updatedUser);
    if (!updatedUser) {
      this.log.warn('updateByOrg -- could not save user');
      throw new InternalServerErrorException();
    }

    return updatedUser;
  }

  private async emailExists(email: string): Promise<boolean> {
    const exists = await this.userRepository.findByEmail(email);
    return !!exists;
  }
}
