import { Request } from 'express';
import { UserEntity } from './../../user/user.entity';

export interface IRequest extends Request {
  user: UserEntity;
}
