import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessControlModule } from 'nest-access-control';
import { JwtStrategy } from '@module/security/strategy/jwt.strategy';
import { RolesBuilderConfig } from '@module/security/security.roles';
import { UserModule } from '@module/user/user.module';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { LocalStrategy } from '@module/security/strategy/local.strategy';
import { SecurityService } from '@module/security/service/security.service';
import { SecurityController } from '@module/security/controller/security.controller';

@Module({
  imports: [
    AccessControlModule.forRoles(RolesBuilderConfig),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          privateKey: {
            key: configService.get('JWT_PRIVATE_KEY'),
            passphrase: configService.get('JWT_PASSPHRASE'),
          },
          publicKey: configService.get('JWT_PUBLIC_KEY'),
          signOptions: {
            expiresIn: configService.get('JWT_TOKEN_TTL'),
            algorithm: 'RS256',
          },
        }) as JwtModuleOptions,
    }),
    forwardRef(() => UserModule),
  ],
  exports: [JwtModule],
  providers: [JwtStrategy, LocalStrategy, SecurityService],
  controllers: [SecurityController],
})
export class SecurityModule {}
