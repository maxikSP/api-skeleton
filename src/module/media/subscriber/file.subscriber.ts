import { Injectable } from '@nestjs/common';
import { EntitySubscriberInterface, RemoveEvent } from 'typeorm';
import { DataSource } from 'typeorm/data-source/DataSource';
import { File } from '@module/media/entity/file';
import { InjectAws } from 'aws-sdk-v3-nest';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileSubscriber implements EntitySubscriberInterface<File> {
  constructor(
    private readonly connection: DataSource,
    private readonly configService: ConfigService,
    @InjectAws(S3Client) private readonly s3: S3Client,
  ) {
    connection.subscribers.push(this);
  }

  public listenTo() {
    return File;
  }

  public async beforeRemove(event: RemoveEvent<File>): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: event.entity?.name,
      }),
    );
  }
}
