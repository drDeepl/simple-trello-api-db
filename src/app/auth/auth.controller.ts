import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmailExistGuard } from '../common/guards/email-exists.guards';
import { AuthService } from './auth.service';
import CreateUserDto from './dto/create-user.dto';
import TokensDto from './dto/tokens.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'регистрация пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: TokensDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
  })
  @ApiBody({ type: CreateUserDto, description: '' })
  @UseGuards(EmailExistGuard)
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<TokensDto> {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
