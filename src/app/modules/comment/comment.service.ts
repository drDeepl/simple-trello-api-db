import { PrismaExceptionHandler } from '@/app/helpers/PrismaExceptionHandler';
import { commentPrismaErrorMessage } from '@/app/utils/error-messages';
import { Injectable, Logger } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { CommentRepository } from './repository/comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    commentPrismaErrorMessage,
  );

  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(
    userId: number,
    dto: CreateCommentDto,
  ): Promise<CommentDto> {
    try {
      const createdComment: Comment = await this.commentRepository.create({
        data: {
          text: dto.text,
          authorId: userId,
          createdAt: new Date(),
        },
      });
      return new CommentDto(
        createdComment.id,
        createdComment.text,
        createdComment.updatedAt,
        createdComment.createdAt,
        createdComment.authorId,
        createdComment.cardId,
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async setCardId(commentId: number, cardId: number): Promise<CommentDto> {
    try {
      const updatedComment: Comment = await this.commentRepository.update({
        data: {
          cardId: cardId,
        },
        where: {
          id: commentId,
        },
      });
      return new CommentDto(
        updatedComment.id,
        updatedComment.text,
        updatedComment.updatedAt,
        updatedComment.createdAt,
        updatedComment.authorId,
        updatedComment.cardId,
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async editCommentById(
    commentId: number,
    dto: EditCommentDto,
  ): Promise<CommentDto> {
    try {
      const updatedComment: Comment = await this.commentRepository.update({
        data: {
          text: dto.text,
          updatedAt: new Date(),
        },
        where: {
          id: commentId,
        },
      });
      return new CommentDto(
        updatedComment.id,
        updatedComment.text,
        updatedComment.updatedAt,
        updatedComment.createdAt,
        updatedComment.authorId,
        updatedComment.cardId,
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async getCommentsByCardId(cardId: number) {
    try {
      const comments: Comment[] = await this.commentRepository.findMany({
        where: {
          cardId: cardId,
        },
      });
      return comments.map(
        (comment: Comment) =>
          new CommentDto(
            comment.id,
            comment.text,
            comment.updatedAt,
            comment.createdAt,
            comment.authorId,
            comment.cardId,
          ),
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

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

  async deleteCommentById(id: number): Promise<void> {
    try {
      await this.commentRepository.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async isCommentWithoutCard(commentId: number): Promise<boolean> {
    try {
      const comment: Comment = await this.commentRepository.findUnique({
        where: {
          id: commentId,
        },
      });

      return comment.cardId === null;
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
