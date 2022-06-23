import { Body, Controller } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { SavePostDto } from './dto/savePost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  async create(@Body() dto: SavePostDto): Promise<PostDto> {
    const post = await this.postService.create(dto);
    return PostDto.fromEntity(post);
  }

  async getById(id: number): Promise<PostDto> {
    const post = await this.postService.getById(id);
    return PostDto.fromEntity(post);
  }

  async getAll(userId: number): Promise<PostDto[]> {
    const posts = await this.postService.getAll(userId);
    return posts.map(PostDto.fromEntity);
  }
}
