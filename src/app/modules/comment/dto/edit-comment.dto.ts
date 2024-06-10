import { BaseCommentDto } from './base-comment.dto';

export class EditCommentDto extends BaseCommentDto {
  constructor(text: string) {
    super(text);
  }
}
