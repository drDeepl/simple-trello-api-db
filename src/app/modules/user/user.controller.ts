import { Controller, Get, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SelfUserGuard } from 'src/app/guards/auth.guard';
import TokensDto from '../auth/dto/tokens.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'информация о текущем пользователе' })
  @ApiResponse({ status: HttpStatus.OK, type: TokensDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется при отсутствии access token-a в заголовке',
  })
  @ApiBody({ type: UserDto, description: '' })
  @UseGuards(SelfUserGuard)
  @Get('me')
  async getCurrentUserInfo() {}
}
