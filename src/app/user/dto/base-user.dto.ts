import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

class BaseUserDto {
  @ApiProperty({
    description: 'электронная почта пользователя',
    nullable: false,
    required: true,
  })
  @IsEmail({}, { message: 'не валидное значение электронной почты' })
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export default BaseUserDto;
