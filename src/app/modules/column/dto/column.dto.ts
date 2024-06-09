import { ApiProperty } from '@nestjs/swagger';
import { BaseColumnDto } from './base-column-dto';

export class CreatedColumnDto extends BaseColumnDto {
  @ApiProperty({
    description: 'id пользователя',
    nullable: false,
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'владелец колонки',
    required: true,
    nullable: false,
  })
  userId: number;

  @ApiProperty({
    description: 'дата создания колонки',
    required: true,
    nullable: false,
  })
  createdAt: string;

  constructor(
    id: number,
    title: string,
    position: number,
    createdAt: string,
    userId: number,
  ) {
    super(title, position);
    this.id = id;
    this.createdAt = createdAt;
    this.userId = userId;
  }
}
