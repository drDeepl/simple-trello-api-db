import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ColumnRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst = this.prisma.column.findFirst;
  findUnique = this.prisma.column.findUnique;
  findMany = this.prisma.column.findMany;
  create = this.prisma.column.create;
  delete = this.prisma.column.delete;
  update = this.prisma.column.update;
}
