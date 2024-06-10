import { AuthRequest } from '@/app/common/types/auth-request.type';
import { NotOwnerException } from '@/app/exceptions/NotOwnerException';
import { exceptionHandler } from '@/app/helpers/exception-handler.helpers';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ColumnService } from '../column.service';

@Injectable()
export class OwnerColumnGuard implements CanActivate {
  private readonly logger = new Logger(OwnerColumnGuard.name);
  constructor(private readonly columnService: ColumnService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: AuthRequest = context.switchToHttp().getRequest();
      const columnId: number = Number(request.params.columnId);
      const isOwnerUserColumn: boolean =
        await this.columnService.isOwnerUserColumn(
          Number(request.user.sub),
          columnId,
        );

      if (isOwnerUserColumn) {
        return true;
      }

      throw new NotOwnerException(
        'недостаточно прав: необходимо быть владельцем колонки',
      );
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
