import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordRequestDto {
  @ApiProperty({
    name: 'email',
    description: 'User registered email.',
    type: 'string',
    required: true,
    example: 'user1@email.com',
  })
  @IsNotEmpty()
  public email: string;
}
