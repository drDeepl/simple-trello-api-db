import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { exceptionHandler } from '../helpers/exception-handler.helpers';
import { AuthService } from '../modules/auth/auth.service';
import { TokenPayloadInterface } from '../modules/auth/interfaces/token-payload.interface';
import { extractJwtFromHeader } from '../utils/jwt.utils';

@Injectable()
export class OwnerUserGuard implements CanActivate {
  private readonly logger = new Logger(OwnerUserGuard.name);
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const accessToken: string | null = extractJwtFromHeader(request);
      if (!accessToken) {
        throw new UnauthorizedException('пользователь неавторизован');
      }
      const tokenPayload: TokenPayloadInterface =
        await this.authService.validateToken(accessToken);
      if (tokenPayload.sub === Number(request.params.id)) {
        return true;
      }
      throw new ForbiddenException('Недостаточно прав для редактирования');
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
