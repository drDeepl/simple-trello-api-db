import { AuthRequest } from '@/app/common/types/auth-request.type';
import { exceptionHandler } from '@/app/helpers/exception-handler.helpers';
import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreatedColumnDto } from './dto/column.dto';

@ApiTags('ColumnController')
@Controller('column')
export class ColumnController {
  private readonly logger = new Logger(ColumnController.name);
  constructor(private readonly columnService: ColumnService) {}

  @ApiOperation({ summary: 'создание колонки' })
  @ApiResponse({ status: HttpStatus.OK, type: CreatedColumnDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'появляется, если пользовтель не авторизован',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
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
}
