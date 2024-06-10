import { PrismaExceptionHandler } from '@/app/helpers/PrismaExceptionHandler';
import { commentPrismaErrorMessage } from '@/app/utils/error-messages';
import { Injectable, Logger } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { CommentRepository } from './repository/comment.repository';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    commentPrismaErrorMessage,
  );

  constructor(private readonly commentRepository: CommentRepository) {}

  async isAuthorComment(userId: number, commentId: number): Promise<boolean> {
    try {
      const comment: Comment = await this.commentRepository.findUnique({
        where: {
          id: commentId,
          authorId: userId,
        },
      });
      return !!comment;
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
