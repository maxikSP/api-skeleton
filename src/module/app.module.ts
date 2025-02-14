import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConnectionOptionsReader } from 'typeorm';
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
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return (await new ConnectionOptionsReader().all())[0];
      },
    } as TypeOrmModuleAsyncOptions),
    SecurityModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
