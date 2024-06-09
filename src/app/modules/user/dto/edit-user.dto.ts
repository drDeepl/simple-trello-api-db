import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import BaseUserDto from './base-user.dto';

export class EditUserDto extends BaseUserDto {
  @ApiProperty({ description: 'публичное имя пользователя', nullable: true })
  @IsString({ message: 'публичное имя пользователя не может быть пустым' })
  username: string;

  @ApiProperty({
    description: 'имя пользователя',
    nullable: true,
  })
  @IsString({ message: 'имя пользователя не может быть пустым' })
  firstName: string;

  constructor(email: string, username: string, firstName: string) {
    super(email);
    this.username = username;
    this.firstName = firstName;
  }
}
