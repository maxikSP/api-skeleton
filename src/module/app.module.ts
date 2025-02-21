import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConnectionOptionsReader } from 'typeorm';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { HealthModule } from '@module/health/health.module';
import { MailerModule } from '@module/mailer/mailer.module';
import { SecurityModule } from '@module/security/security.module';
import { UserModule } from '@module/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        __dirname + `/../../config/.env.${process.env.NODE_ENV}.local`,
        __dirname + `/../../config/.env.${process.env.NODE_ENV}`,
        __dirname + `/../../config/.env`,
      ],
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          config: {
            url: configService.get('REDIS_URL'),
          },
        }) as RedisModuleOptions,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return (await new ConnectionOptionsReader().all())[0];
      },
    } as TypeOrmModuleAsyncOptions),
    HealthModule,
    MailerModule,
    SecurityModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
