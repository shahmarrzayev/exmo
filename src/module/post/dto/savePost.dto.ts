import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PostEntity } from '../post.entity';

export class SavePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @IsString({ each: true })
  @IsOptional()
  videos: string[];

  public static toEntity(dto: SavePostDto): PostEntity {
    const entity = new PostEntity();
    entity.title = dto.title;
    entity.content = dto.content;
    entity.images = dto.images;
    entity.videos = dto.videos;
    return entity;
  }
}
