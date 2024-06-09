import { HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

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
    console.log(
      `error message for user: ${this.errorMessages[error.code].description}`,
    );
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (this.errorMessages[error.code]) {
        return new HttpException(
          this.errorMessages[error.code].description,
          this.errorMessages[error.code].statusCode,
        );
      }
      console.error(`Prisma Error: ${error.message}`);
    }
    return error;
  }
}
