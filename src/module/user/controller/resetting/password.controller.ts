import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  Override,
  ParsedBody,
  ParsedRequest,
  CrudRequest,
} from '@dataui/crud';
import { SCondition } from '@dataui/crud-request';
import { UserService } from '@module/user/service/user.service';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { User } from '@module/user/entity/user';
import { ResetPasswordDto } from '@module/user/dto/resetting/reset.password.dto';

@ApiTags('Users')
@Crud({
  model: {
    type: User,
  },
  dto: {
    update: ResetPasswordDto,
  },
  routes: {
    only: ['updateOneBase'],
    updateOneBase: {
      returnShallow: true,
      allowParamsOverride: true,
    },
  },
  params: {
    id: {
      primary: true,
      disabled: true,
    },
  },
})
@CrudAuth({
  filter: (req: {
    body: { email?: string; password?: string; code?: string };
  }): SCondition => ({
    email: req.body.email,
  }),
})
@Controller('users/password-resetting/apply')
export class PasswordController {
  constructor(
    public readonly service: UserService,
    private readonly redisService: RedisService,
  ) {}

  @Override('updateOneBase')
  public async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ResetPasswordDto,
  ): Promise<void> {
    await this.redisService.getOrThrow('default').del(dto.email);
    await this.service.updateOne(req, { password: dto.password });
  }
}
