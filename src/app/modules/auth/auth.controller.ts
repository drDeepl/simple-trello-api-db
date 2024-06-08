import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailExistGuard } from '../../guards/email-exists.guards';
import { exceptionHandler } from '../../helpers/exception-handler.helpers';
import { AuthService } from './auth.service';
import { default as CreateUserDto, default as SignUpDto } from './dto/sign-up';
import TokensDto from './dto/tokens.dto';

@ApiTags('AuthController')
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
  async signUp(@Body() createUserDto: SignUpDto): Promise<TokensDto> {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'авторизация пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: TokensDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'появляется при несовпадении введенного пароля с паролем пользователя',
  })
  @ApiBody({ type: CreateUserDto, description: '' })
  @Post('signin')
  async signIn(@Body() signInDto: SignUpDto): Promise<TokensDto> {
    try {
      return await this.authService.signIn(signInDto);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
