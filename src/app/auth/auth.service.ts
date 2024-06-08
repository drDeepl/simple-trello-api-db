import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaExceptionHandler } from '../helpers/PrismaExceptionHandler';
import { UserRepository } from '../user/repository/user.repository';
import { userPrismaErrorMessage } from '../utils/error-messages';
import CreateUserDto from './dto/create-user.dto';
import TokensDto from './dto/tokens.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly prismaExceptionHandler: PrismaExceptionHandler =
    new PrismaExceptionHandler(userPrismaErrorMessage);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number): Promise<TokensDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_MINS'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_DAYS'),
        },
      ),
    ]);
    return new TokensDto(accessToken, refreshToken);
  }

  async signUp(dto: CreateUserDto): Promise<TokensDto> {
    try {
      this.logger.debug(dto);
      const passwordHash = await this.hashData(dto.password);

      const user: User = await this.userRepository.create({
        data: {
          email: dto.email,
          passwordHash: passwordHash,
        },
      });
      return await this.getTokens(user.id);
    } catch (error) {
      this.logger.error(error);
      throw this.prismaExceptionHandler.handleError(error);
    }
  }
}
