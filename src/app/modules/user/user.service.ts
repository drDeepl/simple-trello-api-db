import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserNotFoundException } from 'src/app/exceptions/UserNotFoundException';
import { PrismaExceptionHandler } from '../../helpers/PrismaExceptionHandler';
import { userPrismaErrorMessage } from '../../utils/error-messages';
import { EditUserDto } from './dto/edit-user.dto';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private prismaExceptionHandler = new PrismaExceptionHandler(
    userPrismaErrorMessage,
  );
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: number): Promise<UserDto> {
    try {
      const user: UserDto = await this.userRepository.findUnique({
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
        },
        where: { id: userId },
      });
      if (!user) {
        throw new UserNotFoundException('Выбранный пользователь не найден');
      }
      return user;
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }

  async editUserById(userId: number, dto: EditUserDto): Promise<UserDto> {
    try {
      this.logger.error('EDIT USER BY ID');
      console.log(dto);
      const updatedUser: User = await this.userRepository.update({
        data: {
          email: dto.email,
          username: dto.username,
          firstName: dto.firstName,
          updatedAt: new Date(),
        },
        where: { id: userId },
      });
      return new UserDto(
        updatedUser.id,
        updatedUser.email,
        updatedUser.username,
        updatedUser.firstName,
      );
    } catch (error) {
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
