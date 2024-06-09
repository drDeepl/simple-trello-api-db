import { exceptionHandler } from '@/app/helpers/exception-handler.helpers';
import { extractJwtFromHeader } from '@/app/utils/jwt.utils';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../../auth/auth.service';
import { TokenPayloadInterface } from '../../auth/interfaces/token-payload.interface';
import { ColumnService } from '../column.service';

@Injectable()
export class OwnerUserGuard implements CanActivate {
  private readonly logger = new Logger(OwnerUserGuard.name);
  constructor(
    private readonly authService: AuthService,
    private readonly columnService: ColumnService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const accessToken: string | null = extractJwtFromHeader(request);
      if (!accessToken) {
        throw new UnauthorizedException('пользователь неавторизован');
      }
      const tokenPayload: TokenPayloadInterface =
        await this.authService.validateToken(accessToken);
      throw new ForbiddenException('TODO: User is owner of column');
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
