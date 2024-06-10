import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { BaseCommentDto } from './base-comment.dto';

export class CommentDto extends BaseCommentDto {
  @ApiProperty({
    description: 'id комментария',
    required: true,
    nullable: false,
  })
  @IsInt({ message: 'id комментария является целым числом' })
  id: number;

  @ApiProperty({
    description: 'дата обновления комментария в формате ISO8601',
    required: true,
    nullable: true,
  })
  @IsDateString({}, { message: 'строка с датой должна быть в формате ISO8601' })
  updatedAt: string | null;

  @ApiProperty({
    description: 'дата создания комментария в формате ISO8601',
    required: true,
    nullable: true,
  })
  @IsDateString({}, { message: 'строка с датой должна быть в формате ISO8601' })
  createdAt: string;

  @ApiProperty({
    description: 'id автора комментария(userId)',
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'id автора не может быть пустым' })
  authorId: number;

  @ApiProperty({
    description: 'id карточки к которой был оставлен комментарий',
    required: true,
    nullable: true,
  })
  cardId: number | null;

  constructor(
    id: number,
    text: string,
    updatedAt: string | null,
    createdAt: string,
    authorId: number,
    cardId: number | null,
  ) {
    super(text);
    this.id = id;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
    this.authorId = authorId;
    this.cardId = cardId;
  }
}
