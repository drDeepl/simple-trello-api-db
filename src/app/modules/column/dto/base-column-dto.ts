import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class BaseColumnDto {
  @ApiProperty({
    description: 'название колонки',
    required: true,
    nullable: false,
  })
  @IsNotEmpty({ message: 'название колонки не может быть пустым' })
  title: string;

  @ApiProperty({
    description: 'позиция колонки на доске',
    required: true,
    nullable: false,
  })
  @IsInt({ message: 'позиция колонки должна быть целым числом' })
  position: number;

  constructor(title: string, position: number) {
    this.title = title;
    this.position = position;
  }
}
