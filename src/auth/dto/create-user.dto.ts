import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user1', description: 'The username of the user' })
  readonly username: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  readonly password: string;
}
