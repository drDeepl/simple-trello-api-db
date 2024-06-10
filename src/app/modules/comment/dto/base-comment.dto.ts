import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BaseCommentDto {
  @ApiProperty({
    description: 'текст комментария',
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'текст комментария не может быть пустым' })
  text: string;

  constructor(text: string) {
    this.text = text;
  }
}
