import { AuthRequest } from '@/app/common/types/auth-request.type';
import { NotOwnerException } from '@/app/exceptions/NotOwnerException';
import { exceptionHandler } from '@/app/helpers/exception-handler.helpers';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CardService } from '../card.service';

@Injectable()
export class OwnerCardGuard implements CanActivate {
  private readonly logger = new Logger(OwnerCardGuard.name);
  constructor(private readonly cardService: CardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: AuthRequest = context.switchToHttp().getRequest();
      const cardId: number = Number(request.params.cardId);
      const isOwnerUserCard: boolean = await this.cardService.isOwnerUserCard(
        Number(request.user.sub),
        cardId,
      );

      if (isOwnerUserCard) {
        return true;
      }

      throw new NotOwnerException(
        'недостаточно прав: необходимо быть владельцем карточки',
      );
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
