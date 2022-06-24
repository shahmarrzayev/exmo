import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommentEntity } from '../comment.entity';

export class SaveCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  public static toEntity(dto: SaveCommentDto): CommentEntity {
    const entity = new CommentEntity();
    entity.content = dto.content;
    // entity.postId = dto.postId;
    return entity;
  }
}
