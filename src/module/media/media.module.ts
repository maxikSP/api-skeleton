import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { AwsSdkModule } from 'aws-sdk-v3-nest';
import { UploadController } from '@module/media/controller/upload.controller';
import { ConfigService } from '@nestjs/config';
import { FileService } from '@module/media/service/file.service';
import { FileSubscriber } from '@module/media/subscriber/file.subscriber';
import { FileController } from '@module/media/controller/file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@module/media/entity/file';

@Module({
  imports: [
    AwsSdkModule.registerAsync({
      inject: [ConfigService],
      clientType: S3Client,
      useFactory: (configService: ConfigService) => {
        return new S3Client({
          forcePathStyle: true,
          Bucket: configService.get('AWS_BUCKET_NAME'),
          endpoint: configService.get('AWS_ENDPOINT'),
          region: configService.get('AWS_REGION'),
          apiVersion: configService.get('AWS_VERSION'),
          credentials: {
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
          },
        } as any);
      },
    } as any),
    TypeOrmModule.forFeature([File]),
  ],
  exports: [FileService, FileSubscriber],
  providers: [FileService, FileSubscriber],
  controllers: [FileController, UploadController],
})
export class MediaModule {}
