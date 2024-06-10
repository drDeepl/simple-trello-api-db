import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { AuthRequest } from '@/app/common/types/auth-request.type';
import { AuthGuard } from '@nestjs/passport';
import { CreatedColumnDto } from '../column/dto/created-column.dto';
import { CreateCardDto } from './dto/create-card.dto';

@ApiTags('CardController')
@Controller('cards')
export class CardController {
  private readonly logger = new Logger(CardController.name);

  constructor(private readonly cardService: CardService) {}
  @ApiOperation({ summary: 'создание карточки для колонки с id columnId' })
  @ApiResponse({ status: HttpStatus.OK, type: CreatedColumnDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользователь не авторизован',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post(':columnId')
  async createCard(
    @Request() req: AuthRequest,
    @Body() createCardDto: CreateCardDto,
  ) {}
}
