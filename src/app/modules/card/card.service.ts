import { PrismaExceptionHandler } from '@/app/helpers/PrismaExceptionHandler';
import { cardPrismaErrorMessage } from '@/app/utils/error-messages';
import { Injectable, Logger } from '@nestjs/common';
import { Card } from '@prisma/client';
import { CardRepository } from './repository/card.repository';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    cardPrismaErrorMessage,
  );

  constructor(private readonly cardRepository: CardRepository) {}

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
