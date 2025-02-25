import { Module } from '@nestjs/common';
import { MailerModule as NestjsMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestjsMailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAILER_SMTP_SERVER'),
          port: configService.get('MAILER_SMTP_PORT'),
          auth: {
            user: configService.get('MAILER_SMTP_USERNAME'),
            pass: configService.get('MAILER_SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get('MAILER_DEFAULT_FROM'),
          to: configService.get('MAILER_DEFAULT_TO'),
        },
        preview: true,
        template: {
          dir: __dirname + '/template',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
})
export class MailerModule {}
