import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Request,
  Post,
  UseGuards,
  ParseIntPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardService } from './card.service';
import { AuthRequest } from '@/app/common/types/auth-request.type';
import { AuthGuard } from '@nestjs/passport';
import { CreateCardDto } from './dto/create-card.dto';
import { CardDto } from './dto/card-dto';
import { exceptionHandler } from '@/app/helpers/exception-handler.helpers';
import { OwnerColumnGuard } from '../column/guards/owner-column.guard';
import { OwnerCardGuard } from './guards/owner-card.guard';
import { EditCardDto } from './dto/edit-card.dto';
import { HttpExceptionDto } from '@/app/common/dto/http-exception.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { AuthorCommentGuard } from '../comment/guards/author-comment.guard';
import { CommentDto } from '../comment/dto/comment.dto';
import { CommentWithoutCardGuard } from '../comment/guards/comment-without-card.guard';

@ApiTags('CardController')
@Controller('cards')
export class CardController {
  private readonly logger = new Logger(CardController.name);

  constructor(private readonly cardService: CardService) {}

  @ApiOperation({ summary: 'создание карточки для колонки с id columnId' })
  @ApiParam({ name: 'columnId', required: true, description: 'id колонки' })
  @ApiResponse({ status: HttpStatus.OK, type: CardDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'появляется, если пользователь не является владельцем карточки',
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
  @Post('/:columnId')
  async createCard(
    @Request() req: AuthRequest,
    @Param('columnId', ParseIntPipe) columnId,
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardDto> {
    try {
      return await this.cardService.createCard(
        Number(req.user.sub),
        columnId,
        createCardDto,
      );
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'редактирование карточки по её id' })
  @ApiResponse({ status: HttpStatus.OK, type: CardDto })
  @ApiBody({
    description: 'редактирование карточки',
    type: EditCardDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'появляется, если пользователь не является владельцем карточки',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(OwnerCardGuard)
  @UseGuards(AuthGuard('jwt'))
  @Put(':cardId')
  async editCardById(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Body() editCardDto: EditCardDto,
  ): Promise<CardDto> {
    try {
      return await this.cardService.editCardById(cardId, editCardDto);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'перемещение карточки на колонку' })
  @ApiResponse({ status: HttpStatus.OK, type: CardDto })
  @ApiBody({
    description: 'перемещение карточки',
    type: MoveCardDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'появляется, если пользователь не является владельцем карточки или колонки',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @ApiBearerAuth('JWT-Auth')
  @UseGuards(OwnerColumnGuard)
  @UseGuards(OwnerCardGuard)
  @UseGuards(AuthGuard('jwt'))
  @Put('/:cardId/actions/columns/:columnId')
  async moveCardToColumn(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Body() moveCardDto: MoveCardDto,
  ): Promise<CardDto> {
    try {
      return await this.cardService.moveCardToColumn(
        cardId,
        columnId,
        moveCardDto,
      );
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'добавление комментария к карточке' })
  @ApiResponse({ status: HttpStatus.OK, type: CommentDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'появляется, если пользователь не является владельцем карточки или комментария',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @UseGuards(
    AuthGuard('jwt'),
    OwnerCardGuard,
    AuthorCommentGuard,
    CommentWithoutCardGuard,
  )
  @Put('/:cardId/actions/comments/:commentId')
  @ApiBearerAuth('JWT-Auth')
  async addCommentOnCard(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<CommentDto> {
    try {
      return await this.cardService.addComment(cardId, commentId);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }

  @ApiOperation({ summary: 'удаление карточки по её id' })
  @ApiResponse({ status: HttpStatus.OK, type: CardDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'появляется, если пользователь не является владельцем карточки',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'появляется при ошибках валидации полей',
    type: HttpExceptionDto,
  })
  @UseGuards(OwnerCardGuard)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':cardId')
  @ApiBearerAuth('JWT-Auth')
  async deleteCardById(@Param('cardId', ParseIntPipe) cardId): Promise<void> {
    try {
      await this.cardService.deleteCardById(cardId);
    } catch (error) {
      throw exceptionHandler(error, this.logger);
    }
  }
}
