import { Crud, CrudAuth } from '@dataui/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from '@module/user/service/user.service';
import { JwtGuard } from '@module/security/guard/jwt.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { User } from '@module/user/entity/user';

@ApiTags('Users')
@ApiBearerAuth('jwt')
@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['getOneBase'],
    getOneBase: {
      decorators: [
        UseGuards(JwtGuard, ACGuard),
        UseRoles({ resource: 'user', action: 'read', possession: 'own' }),
      ],
    },
  },
  params: {
    id: {
      primary: true,
      disabled: true,
    },
  },
  query: {
    join: {
      avatar: {
        eager: true,
      },
      wallet: {
        eager: true,
      },
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: User) => ({
    id: user.id,
  }),
})
@Controller('users/me')
export class MeController {
  constructor(public readonly service: UserService) {}
}
