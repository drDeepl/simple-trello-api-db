import { BaseCommentDto } from './base-comment.dto';

export class CreateCommentDto extends BaseCommentDto {
  constructor(text: string) {
    super(text);
  }
}
