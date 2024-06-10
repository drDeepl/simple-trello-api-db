import { OwnerUserGuard } from '@/app/guards/owner-user.guard';
import { EmailExistGuard } from '@/app/guards/email-exists.guards';
import { exceptionHandler } from '@/app/helpers/exception-handler.helpers';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EditUserDto } from './dto/edit-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { HttpExceptionDto } from '@/app/common/dto/http-exception.dto';

@ApiTags('UserController')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'получение пользователя по id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'появялется, если пользователь с выбранным id не найден',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
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
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'появляется при отсутствии access token-a в заголовке или когда пользователь не является владельцем изменяемых данных',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'появляется, если id пользователя из токена не совпадает с id из параметра запроса',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @ApiBody({ type: EditUserDto, description: '' })
  @UseGuards(EmailExistGuard)
  @UseGuards(OwnerUserGuard)
  @Put('/:id')
  async editUserById(
    @Param('id', ParseIntPipe) userId: number,
    @Body() editUserDto: EditUserDto,
  ): Promise<UserDto> {
    try {
      return await this.userService.editUserById(userId, editUserDto);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'удаление пользователя по его Id' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'появляется при отсутствии access token-a в заголовке или когда пользователь не является владельцем изменяемых данных',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'появляется, если id пользователя из токена не совпадает с id из параметра запроса',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @UseGuards(OwnerUserGuard)
  @Delete('/:id')
  async deleteUserById(@Param('id', ParseIntPipe) userId: number) {
    try {
      await this.userService.deleteUserById(userId);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
