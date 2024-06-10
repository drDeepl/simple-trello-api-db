import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class HttpExceptionDto extends HttpException {
  @ApiProperty({ description: 'статус код', nullable: false, required: true })
  @IsInt({ message: 'статус код является числом' })
  statusCode: number;

  @ApiProperty({
    description: 'сообщение об ошибке',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'сообщение об ошибке не может быть пустым' })
  message: string;
}
