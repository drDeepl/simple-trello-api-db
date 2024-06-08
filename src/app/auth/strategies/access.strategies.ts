import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(AccessTokenStrategy.name);

  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate(payload: any) {
    this.logger.error('validate');
    console.log(payload);
    return payload;
  }
}
