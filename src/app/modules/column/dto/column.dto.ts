import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { CreatedColumnDto } from './created-column.dto';

export class ColumnDto extends CreatedColumnDto {
  @ApiProperty({
    description: 'дата редактирования колонки(изменения названия, позиции)',
    nullable: true,
    required: true,
  })
  @IsDateString(
    {},
    {
      message:
        'дата обновления должна быть строкой в виде даты в формате  IsISO8601',
    },
  )
  updatedAt: string | null;

  constructor(
    id: number,
    title: string,
    position: number,
    createdAt: Date,
    userId: number,
    updatedAt: Date,
  ) {
    super(id, title, position, createdAt, userId);
    this.updatedAt = updatedAt ? updatedAt.toISOString() : null;
  }
}
