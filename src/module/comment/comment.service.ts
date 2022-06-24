import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { SaveCommentDto } from './dto/saveComment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  private readonly log = new Logger(CommentService.name);

  async create(dto: SaveCommentDto) {
    this.log.debug('create -- start');
    if (!dto) {
      this.log.debug('create -- invalid argument(s)');
      throw new InternalServerErrorException('invalid argument(s)');
    }

    const entity = SaveCommentDto.toEntity(dto);

    // entity = await this.commentRepository.save(dto);
    if (!entity) {
      this.log.debug('create -- comment not created');
      throw new InternalServerErrorException('comment not created');
    }
    this.log.debug('create -- success');
    return entity;
  }
}
