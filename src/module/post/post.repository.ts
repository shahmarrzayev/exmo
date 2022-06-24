import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/repository';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class PostRepository extends GenericRepository {
  constructor(@InjectRepository(PostEntity) private repository: Repository<PostEntity>) {
    super();
  }

  async save(entity: PostEntity): Promise<PostEntity> {
    if (!entity) return null;
    return await this.repository.save(entity);
  }

  async findById(id: number): Promise<PostEntity> {
    if (!id) return null;
    return await this.repository
      .createQueryBuilder('post')
      .select(['post', 'user.id'])
      .leftJoin('post.user', 'user')
      .where('post.id = :id', { id })
      .getOne();
  }

  async findAll(userId: number): Promise<PostEntity[]> {
    if (!userId) return null;
    return await this.repository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.user_id = :userId', { userId })
      .andWhere('post.is_deleted = :isDeleted', { isDeleted: false })
      .getMany();
  }
}
