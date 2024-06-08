import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class TokensDto {
  @ApiProperty({
    description: `access token. время действия ${process.env.JWT_ACCESS_MIN}`,
  })
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    description: `refresh token. время действия ${process.env.JWT_REFRESH_DAYS}`,
  })
  @IsNotEmpty()
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export default TokensDto;
