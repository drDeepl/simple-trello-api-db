import { AuthRequest } from '@/app/common/types/auth-request.type';
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
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ColumnService } from './column.service';
import { ColumnDto } from './dto/column.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreatedColumnDto } from './dto/created-column.dto';
import { EditColumnDto } from './dto/edit-column.dto';
import { OwnerColumnGuard } from './guards/owner-column.guard';
import { CardDto } from '../card/dto/card-dto';
import { HttpExceptionDto } from '@/app/common/dto/http-exception.dto';

@ApiTags('ColumnController')
@Controller('columns')
export class ColumnController {
  private readonly logger = new Logger(ColumnController.name);
  constructor(private readonly columnService: ColumnService) {}

  @ApiOperation({ summary: 'получение списка карточек для колонки' })
  @ApiResponse({ status: HttpStatus.OK, type: CardDto, isArray: true })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'появляется, если пользователь не является владельцем колонки',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(OwnerColumnGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get('/:columnId/cards')
  async getCardsForColumnById(
    @Param('columnId', ParseIntPipe) columnId: number,
  ): Promise<CardDto[]> {
    try {
      return await this.columnService.getCardsForColumnById(columnId);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'создание колонки' })
  @ApiResponse({ status: HttpStatus.OK, type: CreatedColumnDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async createColumn(
    @Request() req: AuthRequest,
    @Body() createColumnDto: CreateColumnDto,
  ): Promise<CreatedColumnDto> {
    try {
      return await this.columnService.createColumn(
        Number(req.user.sub),
        createColumnDto,
      );
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'получение колонок пользователя по его id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreatedColumnDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(AuthGuard('jwt'))
  @Get('by-user/:userId')
  async getColumnsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ColumnDto[]> {
    try {
      return await this.columnService.getColumnsByUserId(userId);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'редактирование колонки' })
  @ApiResponse({ status: HttpStatus.OK, type: CreatedColumnDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'появляется, если пользователь не является владельцем колонки',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(OwnerColumnGuard)
  @UseGuards(AuthGuard('jwt'))
  @Put('/:columnId')
  async editColumnById(
    @Request()
    @Param('columnId', ParseIntPipe)
    columnId: number,
    @Body() editColumnDto: EditColumnDto,
  ): Promise<ColumnDto> {
    try {
      return await this.columnService.editColumnById(columnId, editColumnDto);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'удаление колонки' })
  @ApiResponse({ status: HttpStatus.OK, type: CreatedColumnDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'появляется, если пользователь не является владельцем колонки',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(OwnerColumnGuard)
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:columnId')
  async deleteColumnById(
    @Param('columnId', ParseIntPipe) columnId: number,
  ): Promise<void> {
    try {
      await this.columnService.deleteColumnById(columnId);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
