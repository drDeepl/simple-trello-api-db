import { ConfigService } from '@nestjs/config';

export const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: configService.get('JWT_ACCESS_MINS') },
  }),
  inject: [ConfigService],
};
