import { Controller, UseGuards } from '@nestjs/common';
import { File } from '@module/media/entity/file';
import { ACGuard, UseRoles } from 'nest-access-control';
import { FileService } from '@module/media/service/file.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@module/security/guard/jwt.guard';
import { Crud } from '@dataui/crud';

@ApiTags('Files')
@ApiBearerAuth('jwt')
@Crud({
  model: {
    type: File,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'deleteOneBase'],
    getManyBase: {
      decorators: [
        UseGuards(JwtGuard, ACGuard),
        UseRoles({ resource: 'files', action: 'read', possession: 'any' }),
      ],
    },
    getOneBase: {
      decorators: [
        UseGuards(JwtGuard, ACGuard),
        UseRoles({ resource: 'files', action: 'read', possession: 'own' }),
      ],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(JwtGuard, ACGuard),
        UseRoles({ resource: 'files', action: 'delete', possession: 'own' }),
      ],
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@Controller('files')
export class FileController {
  constructor(public service: FileService) {}
}
