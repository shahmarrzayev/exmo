import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { create } from 'domain';
import { SavePostDto } from './dto/savePost.dto';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  private readonly log = new Logger('PostService');

  async create(dto: SavePostDto, userId: number): Promise<PostEntity> {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const entity = SavePostDto.toEntity(dto);
    console.log(entity);

    const savedPost = await this.postRepository.save(entity);
    if (!savedPost) {
      this.log.debug('create -- post not created');
      throw new InternalServerErrorException('post not created');
    }

    this.log.debug('create -- success');
    return savedPost;
  }

  async getById(id: number): Promise<PostEntity> {
    this.log.debug('getById -- start');
    if (!id) {
      this.log.debug('getById -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const post = await this.postRepository.findById(id);
    if (!post) {
      this.log.debug('getById -- post not found');
      throw new InternalServerErrorException('post not found');
    }

    console.log(post);

    this.log.debug('getById -- success');
    return post;
  }

  async getAll(userId: number): Promise<PostEntity[]> {
    this.log.debug('getAll -- start');
    if (!userId) {
      this.log.debug('getAll -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const posts = await this.postRepository.findAll(userId);
    console.log(posts);
    if (!posts) {
      this.log.debug('getAll -- posts not found');
      throw new InternalServerErrorException('posts not found');
    }

    this.log.debug('getAll -- success');
    return posts;
  }

  async update(id: number, dto: SavePostDto, userId: number) {
    this.log.debug('update -- start');
    if (!id || !dto) {
      this.log.debug('update -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const post = await this.postRepository.findById(id);
    if (!post) {
      this.log.debug('update -- post not found');
      throw new InternalServerErrorException('post not found');
    }

    // if (post.userId !== userId) {
    //   this.log.debug('update -- user not authorized');
    //   throw new InternalServerErrorException('user not authorized');
    // }

    let updatedEntity = { ...post, ...SavePostDto.toEntity(dto) };
    updatedEntity = await this.postRepository.save(updatedEntity);
    if (!updatedEntity) {
      this.log.warn('update -- post not updated');
      throw new InternalServerErrorException('post not updated');
    }

    this.log.debug('update -- success');
    return post;
  }

  async delete(id: number, userId: number): Promise<void> {
    this.log.debug('delete -- start');
    if (!id) {
      this.log.debug('delete -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const post = await this.postRepository.findById(id);
    if (!post) {
      this.log.debug('delete -- post not found');
      throw new InternalServerErrorException('post not found');
    }
    console.log(post, userId);
    // if (post.userId !== userId) {
    //   this.log.debug('delete -- user not authorized');
    //   throw new InternalServerErrorException('user not authorized');
    // }

    post.isDeleted = true;
    const deletedPost = await this.postRepository.save(post);
    if (!deletedPost || !deletedPost.isDeleted) {
      this.log.warn('delete -- post not deleted');
      throw new InternalServerErrorException('post not deleted');
    }

    this.log.debug('delete -- success');
  }
}
