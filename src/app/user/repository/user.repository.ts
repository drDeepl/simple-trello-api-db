import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  findFirst = this.prisma.user.findFirst;
  findUnique = this.prisma.user.findUnique;
  findMany = this.prisma.user.findMany;
  create = this.prisma.user.create;
  delete = this.prisma.user.delete;
  update = this.prisma.user.update;
}
