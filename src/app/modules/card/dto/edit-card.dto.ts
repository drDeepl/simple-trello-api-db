import { ApiProperty } from '@nestjs/swagger';
import { BaseCardDto } from './base-card.dto';
import { IsNotEmpty } from 'class-validator';

export class EditCardDto extends BaseCardDto {
  @ApiProperty({
    description: 'описание карточки',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'описание карточки не может быть пустым' })
  description: string;
}
