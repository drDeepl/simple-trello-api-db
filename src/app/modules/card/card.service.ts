import { PrismaExceptionHandler } from '@/app/helpers/PrismaExceptionHandler';
import { cardPrismaErrorMessage } from 'src/app/utils/error-messages';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { Card } from '@prisma/client';
import { CardRepository } from './repository/card.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { CardDto } from './dto/card-dto';
import { EditCardDto } from './dto/edit-card.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { CommentRepository } from '../comment/repository/comment.repository';
import { CommentService } from '../comment/comment.service';
import { CommentDto } from '../comment/dto/comment.dto';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    cardPrismaErrorMessage,
  );

  constructor(
    private readonly cardRepository: CardRepository,
    private readonly commentService: CommentService,
  ) {}

  async createCard(
    userId: number,
    columnId: number,
    dto: CreateCardDto,
  ): Promise<CardDto> {
    try {
      const createdCard: Card = await this.cardRepository.create({
        data: {
          title: dto.title,
          position: dto.position,
          columnId: columnId,
          userId: userId,
          createdAt: new Date(),
        },
      });
      return new CardDto(
        createdCard.id,
        createdCard.title,
        createdCard.description,
        createdCard.position,
        createdCard.updatedAt,
        createdCard.columnId,
      );
    } catch (error) {
      this.logger.error(error);
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async editCardById(cardId: number, dto: EditCardDto) {
    try {
      const editedCard: Card = await this.cardRepository.update({
        data: {
          title: dto.title,
          position: dto.position,
          description: dto.description,
          updatedAt: new Date(),
        },
        where: { id: cardId },
      });
      return new CardDto(
        editedCard.id,
        editedCard.title,
        editedCard.description,
        editedCard.position,
        editedCard.updatedAt,
        editedCard.columnId,
      );
    } catch (error) {
      this.logger.error(error);
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async moveCardToColumn(
    cardId: number,
    columnId: number,
    moveCardDto: MoveCardDto,
  ): Promise<CardDto> {
    try {
      const editedCard: Card = await this.cardRepository.update({
        data: {
          columnId: columnId,
          position: moveCardDto.position,
        },
        where: { id: cardId },
      });
      return new CardDto(
        editedCard.id,
        editedCard.title,
        editedCard.description,
        editedCard.position,
        editedCard.updatedAt,
        editedCard.columnId,
      );
    } catch (error) {
      this.logger.error(error);
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async deleteCardById(cardId: number): Promise<void> {
    try {
      await this.cardRepository.delete({
        where: {
          id: cardId,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async addComment(cardId: number, commentId: number): Promise<CommentDto> {
    try {
      return await this.commentService.setCardId(commentId, cardId);
    } catch (error) {
      this.logger.error(error);
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async isOwnerUserCard(userId: number, cardId): Promise<boolean> {
    try {
      const column: Card = await this.cardRepository.findUnique({
        where: {
          id: cardId,
          userId: userId,
        },
      });
      return !!column;
    } catch (error) {
      this.logger.error(error);
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
