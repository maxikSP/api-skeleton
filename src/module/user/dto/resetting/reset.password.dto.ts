import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Code } from '@validator/decorator/code.validator';

export class ResetPasswordDto {
  @ApiProperty({
    name: 'email',
    description: 'User registered email.',
    type: 'string',
    required: true,
    example: 'user1@email.com',
  })
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    name: 'password',
    description: 'User new password.',
    type: 'string',
    required: true,
    example: '123',
  })
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    name: 'code',
    description: 'Verification code.',
    type: 'string',
    required: true,
    example: '123456',
  })
  @IsNotEmpty()
  @Code('email')
  public code: number;
}
