import { Injectable, Logger } from '@nestjs/common';
import { PrismaExceptionHandler } from '../helpers/PrismaExceptionHandler';
import { userPrismaErrorMessage } from '../utils/error-messages';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    userPrismaErrorMessage,
  );
  constructor(private readonly userRepository: UserRepository) {}

  s;
}
