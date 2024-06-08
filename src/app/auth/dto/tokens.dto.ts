import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class TokensDto {
  @ApiProperty({
    description: `access token. время действия ${process.env.JWT_ACCESS_MIN}`,
  })
  @IsNotEmpty()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export default TokensDto;
