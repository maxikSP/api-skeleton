import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SecurityService } from '@module/security/service/security.service';
import { User } from '@module/user/entity/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly securityService: SecurityService) {
    super();
  }

  public async validate(username: string, password: string): Promise<User> {
    const user: User | null = await this.securityService.validateUser(
      username,
      password,
    );

    if (null === user) {
      throw new UnauthorizedException('Bad credentials');
    }

    return user;
  }
}
