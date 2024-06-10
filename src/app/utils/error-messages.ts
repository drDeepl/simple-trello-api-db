import { HttpStatus } from '@nestjs/common';

export const userPrismaErrorMessage: {
  [key: string]: { statusCode: number; description: string };
} = {
  P2002: {
    statusCode: HttpStatus.FORBIDDEN,
    description: 'Пользователь с таким публичным именем уже существует',
  },
  P2025: {
    statusCode: HttpStatus.NOT_FOUND,
    description: 'Запрашиваемый пользователь не существует',
  },
};

export const columnPrismaErrorMessage: {
  [key: string]: { statusCode: number; description: string };
} = {
  P2025: {
    statusCode: HttpStatus.NOT_FOUND,
    description: 'Запрашивамой колонки не существует',
  },
};

export const cardPrismaErrorMessage: {
  [key: string]: { statusCode: number; description: string };
} = {
  P2025: {
    statusCode: HttpStatus.NOT_FOUND,
    description: 'Запрашивамой карточки не существует',
  },
};
