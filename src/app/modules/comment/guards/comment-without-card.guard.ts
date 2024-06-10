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
export class CommentWithoutCardGuard implements CanActivate {
  private readonly logger = new Logger(CommentWithoutCardGuard.name);
  constructor(private readonly commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.warn('CAN ACTIVATE');
    try {
      const request: AuthRequest = context.switchToHttp().getRequest();
      const commentId: number = Number(request.params.commentId);
      const isCommentWithoutCard: boolean =
        await this.commentService.isCommentWithoutCard(commentId);

      if (isCommentWithoutCard) {
        return true;
      }
      throw new NotOwnerException(
        'выбранный комментарий принадлежит другой карточке',
      );
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
