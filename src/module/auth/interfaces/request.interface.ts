import { Request } from 'express';
import { UserEntity } from '../../user/entity/user.entity';

export interface IRequest extends Request {
  user: UserEntity;
}
