import { ApiProperty } from '@nestjs/swagger';
import { BaseCardDto } from './base-card.dto';
import { IsDateString } from 'class-validator';

export class CardDto extends BaseCardDto {
  @ApiProperty({
    description: 'id карточки или cardId',
    required: true,
    nullable: false,
  })
  id: number;

  @ApiProperty({
    description: 'описание карточки',
    required: true,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'дата обновления карточки в формате ISO8601',
    required: true,
    nullable: true,
  })
  @IsDateString({}, { message: 'строка с датой должна быть в формате ISO8601' })
  updatedAt: string | null;

  @ApiProperty({
    description: 'id колонки в которой находится карточка',
    required: true,
    nullable: false,
  })
  columnId: number;

  constructor(
    id: number,
    title: string,
    description: string | null,
    position: number,
    updatedAt: Date,
    columnId: number,
  ) {
    super(title, position);
    this.id = id;
    this.description = description;
    this.updatedAt = updatedAt ? updatedAt.toISOString() : null;
    this.columnId = columnId;
  }
}
