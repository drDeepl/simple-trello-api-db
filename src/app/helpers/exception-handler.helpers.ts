import { BadGatewayException, HttpException, Logger } from '@nestjs/common';

export const exceptionHandler = (error: any, logger: Logger) => {
  if (error instanceof HttpException) {
    return error;
  }
  logger.error(error);
  return new BadGatewayException('что-то пошло не так');
};
