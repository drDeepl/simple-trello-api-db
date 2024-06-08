import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import BaseUserDto from '../../user/dto/base-user.dto';

class CreateUserDto extends BaseUserDto {
  @ApiProperty({
    description: 'пароль пользователя',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'пароль не может быть пустым' })
  password: string;
}

export default CreateUserDto;
