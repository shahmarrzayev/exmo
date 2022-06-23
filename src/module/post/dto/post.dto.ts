import { PostEntity } from '../post.entity';

export class PostDto {
  title: string;
  content: string;
  images: string[];
  videos: string[];

  public static fromEntity(entity: PostEntity): PostDto {
    const dto = new PostDto();
    dto.title = entity.title;
    dto.content = entity.content;
    dto.images = entity.images;
    dto.videos = entity.videos;
    return dto;
  }
}
