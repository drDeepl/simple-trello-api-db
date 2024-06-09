import { PrismaExceptionHandler } from '@/app/helpers/PrismaExceptionHandler';
import { columnPrismaErrorMessage } from '@/app/utils/error-messages';
import { Injectable, Logger } from '@nestjs/common';
import { Column } from '@prisma/client';
import { CreatedColumnDto } from './dto/column.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnRepository } from './repository/column.repository';

@Injectable()
export class ColumnService {
  private readonly logger = new Logger(ColumnService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    columnPrismaErrorMessage,
  );

  constructor(private readonly columnRepository: ColumnRepository) {}

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
      console.log(createdColumn);
      return new CreatedColumnDto(
        createdColumn.id,
        createdColumn.title,
        createdColumn.position,
        createdColumn.createdAt.toISOString(),
        createdColumn.userId,
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
