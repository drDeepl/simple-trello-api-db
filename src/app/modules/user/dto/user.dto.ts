import { ApiProperty } from '@nestjs/swagger';
import BaseUserDto from './base-user.dto';

export class UserDto extends BaseUserDto {
  @ApiProperty({
    description: 'id пользователя. В маршрутах используется как userId',
    nullable: false,
  })
  id: number;

  @ApiProperty({ description: 'публичное имя пользователя', nullable: true })
  username: string;

  @ApiProperty({ description: 'имя пользователя', nullable: true })
  firstName: string;

  constructor(id: number, email: string, username: string, firstName: string) {
    super(email);
    this.id = id;
    this.username = username;
    this.firstName = firstName;
  }
}
