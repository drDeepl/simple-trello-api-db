import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export const exceptionHandler = (error: any, logger: Logger) => {
  logger.error(error);
  switch (error) {
    case error instanceof HttpException: {
      return error;
    }
    default:
      const message = error?.message ?? 'что-то пошло не так';
      const status = error?.status ?? HttpStatus.BAD_GATEWAY;
      return new HttpException(message, status);
  }
};
