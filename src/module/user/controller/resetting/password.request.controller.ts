import { Crud, Override, ParsedRequest, CrudRequest } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@module/user/service/user.service';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { User } from '@module/user/entity/user';
import { randomInt } from 'crypto';

@ApiTags('Users')
@Crud({
  model: {
    type: User,
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
    email: {
      field: 'email',
      type: 'string',
    },
  },
})
@Controller('users/password-resetting/request/:email')
export class PasswordRequestController {
  private readonly resetPasswordTTL: number;

  constructor(
    public readonly service: UserService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly mailerService: MailerService,
  ) {
    this.resetPasswordTTL = Number(configService.get('RESET_PASSWORD_TTL'));
  }

  @Override('updateOneBase')
  public async updateOne(@ParsedRequest() req: CrudRequest): Promise<void> {
    const user: User = await this.service.getOne(req);

    //todo you are free to chose any rand provider
    const code = randomInt(100000, 999999);

    await this.redisService
      .getOrThrow('default')
      .setex(user.email, this.resetPasswordTTL, code);

    await this.mailerService.sendMail({
      subject: 'Password resetting.',
      to: user.email,
      template: 'resetting',
      context: { code },
    });
  }
}
