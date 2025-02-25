import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@module/user/entity/user';
import { UserService } from '@module/user/service/user.service';
import { UserController } from '@module/user/controller/user.controller';
import { MeController } from '@module/user/controller/me.controller';
import { PasswordRequestController } from '@module/user/controller/resetting/password.request.controller';
import { PasswordController } from '@module/user/controller/resetting/password.controller';

@Module({
  controllers: [
    UserController,
    MeController,
    PasswordRequestController,
    PasswordController,
  ],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
