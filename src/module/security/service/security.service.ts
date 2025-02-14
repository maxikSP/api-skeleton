import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@module/user/service/user.service';
import { User } from '@module/user/entity/user';

@Injectable()
export class SecurityService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user: User | null = await this.userService.findByUsername(username);

    if (null !== user && (await compare(password, user.password))) {
      return user;
    }

    return null;
  }

  public async createToken(user: User): Promise<any> {
    return {
      token: await this.jwtService.signAsync({
        sub: user.id,
      }),
    };
  }
}
