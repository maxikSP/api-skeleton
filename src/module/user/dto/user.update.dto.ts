import { OmitType, PartialType } from '@nestjs/swagger';
import { UserCreateDto } from '@module/user/dto/user.create.dto';

export class UserUpdateDto extends PartialType(UserCreateDto) {}
export class UserUpdateBasicDto extends OmitType(UserUpdateDto, [
  'password',
  'role',
]) {}
