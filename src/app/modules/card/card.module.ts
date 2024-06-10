import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CardRepository } from './repository/card.repository';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ColumnService } from '../column/column.service';
import { ColumnRepository } from '../column/repository/column.repository';

@Module({
  controllers: [CardController],
  providers: [
    CardService,
    ColumnService,
    ColumnRepository,
    CardRepository,
    UserRepository,
    AuthService,
    JwtService,
  ],
})
export class CardModule {}
