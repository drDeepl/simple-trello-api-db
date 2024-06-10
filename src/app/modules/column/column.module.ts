import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/repository/user.repository';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { ColumnRepository } from './repository/column.repository';
import { CardRepository } from '../card/repository/card.repository';

@Module({
  controllers: [ColumnController],
  providers: [
    ColumnService,
    ColumnRepository,
    CardRepository,
    UserRepository,
    AuthService,
    JwtService,
  ],
})
export class ColumnModule {}
