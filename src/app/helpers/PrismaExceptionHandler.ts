import { HttpException, HttpStatus } from '@nestjs/common';

export class PrismaExceptionHandler {
  private readonly errorMessages: {
    [key: string]: { statusCode: number; description: string };
  };
  constructor(errorMessages: {
    [key: string]: { statusCode: number; description: string };
  }) {
    this.errorMessages = errorMessages;
  }
  public handleError(error: any): HttpException {
    console.log(`error code: ${error.code}`);
    if (error.code in this.errorMessages) {
      return new HttpException(
        this.errorMessages[error.code].description,
        this.errorMessages[error.code].statusCode,
      );
    }
    console.error(`Prisma Error: ${error.message}`);
    return new HttpException(error.message, HttpStatus.BAD_GATEWAY);
  }
}
