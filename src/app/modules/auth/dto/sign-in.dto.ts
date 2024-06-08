import { IsNotEmpty } from 'class-validator';
import BaseUserDto from 'src/app/modules/user/dto/base-user.dto';

class SignInDto extends BaseUserDto {
  @IsNotEmpty({ message: 'пароль не может быть пустым' })
  password: string;
  constructor(email: string, password: string) {
    super(email);
    this.password = password;
  }
}

export default SignInDto;
