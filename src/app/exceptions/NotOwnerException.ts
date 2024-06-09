import { ForbiddenException } from '@nestjs/common';

export class NotOwnerException extends ForbiddenException {
  constructor(
    message: string = 'недостаточно прав: необходимо быть владельцем сущности',
  ) {
    super(message);
  }
}
