import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class MoveCardDto {
  @ApiProperty({
    description: 'позиция карточки на колонке',
    required: true,
    nullable: false,
  })
  @IsInt({ message: 'позиция карточки должна быть целым числом' })
  position: number;

  constructor(position: number) {
    this.position = position;
  }
}
