import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { IRequest } from '../auth/interfaces/request.interface';
import { EPermission } from '../role/enum/permission.enum';
import { PostDto } from './dto/post.dto';
import { SavePostDto } from './dto/savePost.dto';
import { PostService } from './post.service';

@Controller('/api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  async create(@Req() req: IRequest, @Body() dto: SavePostDto): Promise<PostDto> {
    const post = await this.postService.create(dto, req.user?.id);
    return PostDto.fromEntity(post);
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<PostDto> {
    const post = await this.postService.getById(id);
    return PostDto.fromEntity(post);
  }

  @Get('/')
  async getAll(@Req() req: IRequest): Promise<PostDto[]> {
    const posts = await this.postService.getAll(req.user?.id);
    return posts.map(PostDto.fromEntity);
  }

  @Delete('/:id')
  async delete(@Req() req: IRequest, @Param('id') id: number): Promise<void> {
    await this.postService.delete(id, req.user?.id);
  }
}
