import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

export const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: configService.get('JWT_ACCESS_MINS') },
  }),
  inject: [ConfigService],
};

export const extractJwtFromHeader = (request: Request): string | null => {
  const { authorization }: any = request.headers;
  if (!authorization || authorization.trim() === '') {
    return null;
  }
  return authorization.replace('Bearer', '').trim();
};
