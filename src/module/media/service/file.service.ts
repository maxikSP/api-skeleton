import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { InjectAws } from 'aws-sdk-v3-nest';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { File } from '@module/media/entity/file';
import { v4 as uuidV4 } from 'uuid';
import { File as FileInfo } from '@nest-lab/fastify-multer';
import { ConfigService } from '@nestjs/config';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import * as mime from 'mime';

@Injectable()
export class FileService extends TypeOrmCrudService<File> {
  constructor(
    @InjectRepository(File) protected readonly repo: Repository<File>,
    @InjectAws(S3Client) private readonly s3: S3Client,
    private readonly configService: ConfigService,
  ) {
    super(repo);
  }

  public create(file: FileInfo, context: string): Promise<File> {
    const name = `${context}/${uuidV4()}.${mime.getExtension(file.mimetype)}`;

    return this.repo.manager.transaction(
      async (entityManager: EntityManager): Promise<File> => {
        const entity = await entityManager.save(File, {
          name,
          context,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        });

        await this.s3.send(
          new PutObjectCommand({
            ACL: 'private',
            Bucket: this.configService.get('AWS_BUCKET_NAME'),
            Key: name,
            ContentType: file.mimetype,
            Body: file.buffer,
          }),
        );

        return entity;
      },
    );
  }
}
