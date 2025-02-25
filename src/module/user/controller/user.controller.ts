import { Crud } from '@dataui/crud';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtGuard } from '@module/security/guard/jwt.guard';
import { UserService } from '@module/user/service/user.service';
import { User } from '@module/user/entity/user';
import { UserCreateDto } from '@module/user/dto/user.create.dto';
import { UserUpdateBasicDto } from '@module/user/dto/user.update.dto';

@ApiTags('Users')
@ApiBearerAuth('jwt')
@Crud({
  model: {
    type: User,
  },
  dto: {
    create: UserCreateDto,
    update: UserUpdateBasicDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase'],
    getManyBase: {
      decorators: [
        UseGuards(JwtGuard, ACGuard),
        UseRoles({ resource: 'user', action: 'read', possession: 'any' }),
      ],
    },
    getOneBase: {
      decorators: [
        UseGuards(JwtGuard, ACGuard),
        UseRoles({ resource: 'user', action: 'read', possession: 'any' }),
      ],
    },
    createOneBase: {},
    updateOneBase: {
      decorators: [
        UseGuards(JwtGuard, ACGuard),
        UseRoles({ resource: 'user', action: 'update', possession: 'own' }),
      ],
    },
  },
  query: {
    join: {
      avatar: {
        eager: true,
      },
    },
  },
})
@Controller('users')
export class UserController {
  constructor(public readonly service: UserService) {}
}
