import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileContext } from '@module/media/constant/context.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity({ name: 'files' })
export class File {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    nullable: false,
    readOnly: true,
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ type: 'string', nullable: false })
  @Column({ length: 100 })
  public name: string;

  @ApiProperty({ type: 'string', nullable: true })
  @Column({ length: 200, nullable: true })
  public originalName?: string;

  @ApiProperty({ type: 'string', nullable: true })
  @Column({ enum: FileContext, length: 50, nullable: true })
  public context?: string;

  @ApiProperty({ type: 'string', nullable: true })
  @Column({ length: 50, nullable: true })
  public mimetype?: string;

  @ApiProperty({ type: 'number', nullable: true })
  @Column({ nullable: true })
  public size?: number;

  @ApiProperty({
    type: 'string',
    format: 'datetime',
    example: '2077-01-01T20:00:00.000Z',
    nullable: true,
  })
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'datetime',
    example: '2077-01-01T20:00:00.000Z',
    nullable: true,
  })
  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  public updatedAt: Date;

  @ApiProperty({ type: 'string', nullable: true })
  @Expose()
  public get uri(): string {
    return process.env.AWS_CLOUD_FRONT_WEB_HOST + this.name;
  }
}
