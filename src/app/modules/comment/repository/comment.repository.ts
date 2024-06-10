import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/modules/prisma/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst = this.prisma.comment.findFirst;
  findUnique = this.prisma.comment.findUnique;
  findMany = this.prisma.comment.findMany;
  create = this.prisma.comment.create;
  delete = this.prisma.comment.delete;
  update = this.prisma.comment.update;
}
