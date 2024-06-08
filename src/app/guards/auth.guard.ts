import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { TokenPayloadInterface } from '../modules/auth/interfaces/token-payload.interface';

@Injectable()
export class SelfUserGuard implements CanActivate {
  private readonly logger = new Logger(SelfUserGuard.name);
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('пользователь неавторизован');
      }
      const authToken = authorization.replace('Bearer', '').trim();
      const tokenPayload: TokenPayloadInterface =
        await this.authService.validateToken(authToken);
      this.logger.error(tokenPayload);
      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException('Недостаточно прав для просмотра');
    }
  }
}
