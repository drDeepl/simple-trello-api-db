import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from '../exceptions/UserNotFoundException';
import { PrismaExceptionHandler } from '../helpers/PrismaExceptionHandler';
import { UserRepository } from '../user/repository/user.repository';
import { userPrismaErrorMessage } from '../utils/error-messages';
import SignInDto from './dto/sign-in.dto';
import SignUpDto from './dto/sign-up';
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
    const accessToken: string = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_MINS'),
      },
    );
    return new TokensDto(accessToken);
  }

  async signUp(dto: SignUpDto): Promise<TokensDto> {
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

  async signIn(dto: SignInDto): Promise<TokensDto> {
    const user: User = await this.userRepository.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UserNotFoundException();
    }
    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('неверный пароль');
    }
    return await this.getTokens(user.id);
  }
}
