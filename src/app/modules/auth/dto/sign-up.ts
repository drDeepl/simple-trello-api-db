import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import BaseUserDto from '../../user/dto/base-user.dto';

class SignUpDto extends BaseUserDto {
  @ApiProperty({
    description: 'пароль пользователя',
    nullable: false,
    required: true,
  })
  @IsNotEmpty({ message: 'пароль не может быть пустым' })
  password: string;

  constructor(email: string, password: string) {
    super(email);
    this.password = password;
  }
}

export default SignUpDto;
