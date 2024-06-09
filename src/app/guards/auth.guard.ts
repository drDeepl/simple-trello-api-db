import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { exceptionHandler } from '../helpers/exception-handler.helpers';
import { AuthService } from '../modules/auth/auth.service';
import { TokenPayloadInterface } from '../modules/auth/interfaces/token-payload.interface';

@Injectable()
export class OwnerUserGuard implements CanActivate {
  private readonly logger = new Logger(OwnerUserGuard.name);
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
      if (tokenPayload.sub === Number(request.params.id)) {
        return true;
      }
      throw new ForbiddenException('Недостаточно прав для редактирования');
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
