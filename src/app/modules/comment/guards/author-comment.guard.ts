import { AuthRequest } from '@/app/common/types/auth-request.type';
import { NotOwnerException } from '@/app/exceptions/NotOwnerException';
import { exceptionHandler } from '@/app/helpers/exception-handler.helpers';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CommentService } from '../comment.service';

@Injectable()
export class AuthorCommentGuard implements CanActivate {
  private readonly logger = new Logger(AuthorCommentGuard.name);
  constructor(private readonly commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.warn('CAN ACTIVATE');
    try {
      const request: AuthRequest = context.switchToHttp().getRequest();
      const commentId: number = Number(request.params.commentId);
      const isOwnerUserColumn: boolean =
        await this.commentService.isAuthorComment(
          Number(request.user.sub),
          commentId,
        );

      if (isOwnerUserColumn) {
        return true;
      }

      throw new NotOwnerException(
        'недостаточно прав: необходимо быть автором комментария',
      );
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
