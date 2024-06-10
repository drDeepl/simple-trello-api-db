import { PrismaExceptionHandler } from '@/app/helpers/PrismaExceptionHandler';
import { columnPrismaErrorMessage } from '@/app/utils/error-messages';
import { Injectable, Logger } from '@nestjs/common';
import { Card, Column } from '@prisma/client';
import { ColumnDto } from './dto/column.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreatedColumnDto } from './dto/created-column.dto';
import { EditColumnDto } from './dto/edit-column.dto';
import { ColumnRepository } from './repository/column.repository';
import { CardRepository } from '../card/repository/card.repository';
import { CardDto } from '../card/dto/card-dto';

@Injectable()
export class ColumnService {
  private readonly logger = new Logger(ColumnService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    columnPrismaErrorMessage,
  );

  constructor(
    private readonly columnRepository: ColumnRepository,
    private readonly cardRepository: CardRepository,
  ) {}

  async createColumn(
    userId: number,
    dto: CreateColumnDto,
  ): Promise<CreatedColumnDto> {
    this.logger.debug('create column');
    try {
      const createdColumn: Column = await this.columnRepository.create({
        data: {
          title: dto.title,
          position: dto.position,
          userId: userId,
        },
      });
      return new CreatedColumnDto(
        createdColumn.id,
        createdColumn.title,
        createdColumn.position,
        createdColumn.createdAt,
        createdColumn.userId,
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async getCardsForColumnById(columnId: number) {
    try {
      const cards: Card[] = await this.cardRepository.findMany({
        where: { columnId: columnId },
      });
      return cards.map(
        (card: Card) =>
          new CardDto(
            card.id,
            card.title,
            card.description,
            card.position,
            card.updatedAt,
            card.columnId,
          ),
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async editColumnById(id: number, dto: EditColumnDto) {
    try {
      const editedColumn = await this.columnRepository.update({
        data: {
          title: dto.title,
          position: dto.position,
          updatedAt: new Date(),
        },
        where: { id: id },
      });
      return new ColumnDto(
        editedColumn.id,
        editedColumn.title,
        editedColumn.position,
        editedColumn.createdAt,
        editedColumn.userId,
        editedColumn.updatedAt,
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
  async getColumnsByUserId(userId: number): Promise<ColumnDto[]> {
    try {
      const columns: Column[] = await this.columnRepository.findMany({
        where: { userId: userId },
      });
      return columns.map(
        (column) =>
          new ColumnDto(
            column.id,
            column.title,
            column.position,
            column.createdAt,
            column.userId,
            column.updatedAt,
          ),
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async deleteColumnById(id: number) {
    try {
      await this.columnRepository.delete({ where: { id: id } });
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async isOwnerUserColumn(userId: number, columnId: number): Promise<boolean> {
    try {
      const column: Column = await this.columnRepository.findUnique({
        where: {
          id: columnId,
          userId: userId,
        },
      });
      return !!column;
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
