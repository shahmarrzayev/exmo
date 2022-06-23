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
    return await this.repository.save(entity);
  }

  async findById(id: number): Promise<PostEntity> {
    return await this.repository.createQueryBuilder('post').where('post.id = :id', { id }).getOne();
  }

  async findAll(userId: number): Promise<PostEntity[]> {
    return await this.repository
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .getMany();
  }
}
