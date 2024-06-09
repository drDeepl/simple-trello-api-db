import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OwnerUserGuard } from 'src/app/guards/auth.guard';
import { EmailExistGuard } from 'src/app/guards/email-exists.guards';
import { exceptionHandler } from 'src/app/helpers/exception-handler.helpers';
import TokensDto from '../auth/dto/tokens.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'получение пользователя по id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'появялется, если пользователь с выбранным id не найден',
  })
  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) userId: number) {
    try {
      return await this.userService.getUserById(userId);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'обновление информации о пользователе' })
  @ApiResponse({ status: HttpStatus.OK, type: TokensDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'появляется при отсутствии access token-a в заголовке или когда пользователь не является владельцем изменяемых данных',
  })
  @ApiBody({ type: EditUserDto, description: '' })
  @UseGuards(EmailExistGuard)
  @UseGuards(OwnerUserGuard)
  @Put('/:id')
  async editUserById(
    @Param('id', ParseIntPipe) userId: number,
    @Body() editUserDto: EditUserDto,
  ) {
    try {
      return await this.userService.editUserById(userId, editUserDto);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
