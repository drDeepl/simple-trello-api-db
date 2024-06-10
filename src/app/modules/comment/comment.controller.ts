import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
  Request,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { HttpExceptionDto } from '@/app/common/dto/http-exception.dto';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { exceptionHandler } from '@/app/helpers/exception-handler.helpers';
import { AuthRequest } from '@/app/common/types/auth-request.type';

@ApiTags('CommentController')
@Controller('comments')
export class CommentController {
  private readonly logger = new Logger(CommentController.name);

  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'получение списка комментариев для карточки' })
  @ApiResponse({ status: HttpStatus.OK, type: CommentDto, isArray: true })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @Get(':cardId')
  async getCommentsByCardId(@Param('cardId', ParseIntPipe) cardId: number) {
    try {
      return await this.commentService.getCommentsByCardId(cardId);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'получение списка карточек для колонки' })
  @ApiResponse({ status: HttpStatus.OK, type: CommentDto })
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
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createComment(
    @Request() request: AuthRequest,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    try {
      return await this.commentService.createComment(
        Number(request.user.sub),
        createCommentDto,
      );
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
