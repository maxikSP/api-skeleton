import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@module/security/security.roles';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import {
  CallbackEntity,
  CallbackEntityConstraintScope,
} from '@validator/decorator/callback.entity.validator';
import { isEmpty, isNil } from 'lodash';
import { User } from '@module/user/entity/user';

export class UserCreateDto {
  @IsNotEmpty()
  @IsEnum(Roles)
  public role: Roles = Roles.USER;

  @ApiProperty({ type: 'string', nullable: true })
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty({ type: 'string', nullable: true })
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty({ type: 'string', nullable: false })
  @IsNotEmpty()
  @IsEmail()
  @CallbackEntity(
    async (scope: CallbackEntityConstraintScope): Promise<boolean> => {
      const { email } = scope.object as UserCreateDto;

      return (
        isEmpty(email) ||
        isNil(email) ||
        isNil(
          await scope.manager.findOne(User, {
            where: { email },
          }),
        )
      );
    },
    { message: 'User account with requested email already exist.' },
  )
  public email: string;

  @ApiProperty({ type: 'string', nullable: false })
  @IsNotEmpty()
  public password: string;
}
