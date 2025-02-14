import { ApiProperty } from '@nestjs/swagger';

export class SecurityDto {
  @ApiProperty({
    name: 'username',
    description: 'User registered with username.',
    type: 'string',
    required: true,
    example: 'user1@email.com',
  })
  public username: string;

  @ApiProperty({
    name: 'password',
    description: 'User plain password.',
    type: 'string',
    required: true,
    example: '123',
  })
  public password: string;
}
