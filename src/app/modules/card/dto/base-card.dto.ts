import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class BaseCardDto {
  @ApiProperty({
    description: 'название карточки',
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'название карточки не может быть пустым' })
  title: string;

  @ApiProperty({
    description: 'позиция карточки на колонке',
    required: true,
    nullable: false,
  })
  @IsInt({ message: 'позиция карточки должна быть целым числом' })
  position: number;
}
