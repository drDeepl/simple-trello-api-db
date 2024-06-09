import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CardRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst = this.prisma.card.findFirst;
  findUnique = this.prisma.card.findUnique;
  findMany = this.prisma.card.findMany;
  create = this.prisma.card.create;
  delete = this.prisma.card.delete;
  update = this.prisma.card.update;
}
