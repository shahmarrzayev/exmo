import { Injectable, Logger } from '@nestjs/common';
import { create } from 'domain';
import { SavePostDto } from './dto/savePost.dto';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  private readonly log = new Logger('PostService');

  async create(dto: SavePostDto): Promise<PostEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.debug('create -- invalid argument(s)');
      throw new Error('invalid argument(s)');
    }

    const entity = SavePostDto.toEntity(dto);
    const post = await this.postRepository.save(entity);
    if (!post) {
      this.log.debug('create -- post not created');
      throw new Error('post not created');
    }

    this.log.debug('create -- success');
    return post;
  }

  async getById(id: number): Promise<PostEntity> {
    this.log.debug('getById -- start');
    if (!id) {
      this.log.debug('getById -- invalid argument(s)');
      throw new Error('invalid argument(s)');
    }

    const post = await this.postRepository.findById(id);
    if (!post) {
      this.log.debug('getById -- post not found');
      throw new Error('post not found');
    }

    this.log.debug('getById -- success');
    return post;
  }

  async getAll(userId: number): Promise<PostEntity[]> {
    this.log.debug('getAll -- start');
    const posts = await this.postRepository.findAll(userId);
    if (!posts) {
      this.log.debug('getAll -- posts not found');
      throw new Error('posts not found');
    }

    this.log.debug('getAll -- success');
    return posts;
  }

  async update(id: number, dto: SavePostDto, userId: number) {
    this.log.debug('update -- start');
    if (!id || !dto) {
      this.log.debug('update -- invalid argument(s)');
      throw new Error('invalid argument(s)');
    }

    const post = await this.postRepository.findById(id);
    if (!post) {
      this.log.debug('update -- post not found');
      throw new Error('post not found');
    }

    if (post.userId !== userId) {
      this.log.debug('update -- user not authorized');
      throw new Error('user not authorized');
    }

    let updatedEntity = { ...post, ...SavePostDto.toEntity(dto) };
    updatedEntity = await this.postRepository.save(updatedEntity);
    if (!updatedEntity) {
      this.log.warn('update -- post not updated');
      throw new Error('post not updated');
    }

    this.log.debug('update -- success');
    return post;
  }
}
