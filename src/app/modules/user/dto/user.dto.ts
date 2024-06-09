import { ApiProperty } from '@nestjs/swagger';
import BaseUserDto from './base-user.dto';
import { IsString } from 'class-validator';

export class UserDto extends BaseUserDto {
  @ApiProperty({
    description: 'id пользователя. В маршрутах используется как userId',
    nullable: false,
  })
  id: number;

  @ApiProperty({ description: 'публичное имя пользователя', nullable: true })
  @IsString()
  username: string;

  @ApiProperty({ description: 'имя пользователя', nullable: true })
  @IsString()
  firstName: string;

  constructor(id: number, email: string, username: string, firstName: string) {
    super(email);
    this.id = id;
    this.username = username;
    this.firstName = firstName;
  }
}
