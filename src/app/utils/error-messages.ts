import { HttpStatus } from '@nestjs/common';

export const userPrismaErrorMessage: {
  [key: string]: { statusCode: number; description: string };
} = {
  P2002: {
    statusCode: HttpStatus.FORBIDDEN,
    description: 'Пользователь с такой электронной почтой уже существует',
  },
  P2016: {
    statusCode: HttpStatus.BAD_REQUEST,
    description: 'Превышено допустимое количество символов',
  },
  P2025: {
    statusCode: HttpStatus.NOT_FOUND,
    description: 'Запрашиваемый пользователь не существует',
  },
};
