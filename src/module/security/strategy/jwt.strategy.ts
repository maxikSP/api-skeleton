import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy, WithSecretOrKey } from 'passport-jwt';
import { User } from '@module/user/entity/user';
import { UserService } from '@module/user/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      algorithms: ['RS256'],
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_PUBLIC_KEY'),
    } as WithSecretOrKey);
  }

  public validate(payload: { sub: string }): Promise<User | null> {
    return this.userService.findById(payload.sub);
  }
}
