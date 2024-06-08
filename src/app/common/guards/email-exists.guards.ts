import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from 'src/app/user/repository/user.repository';

@Injectable()
export class EmailExistGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().body;
    const foundUser = await this.userRepository.findUnique({
      where: {
        email: user.email,
      },
    });
    if (foundUser) {
      throw new HttpException(
        'пользователь с такой электронной почтой уже существует',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
