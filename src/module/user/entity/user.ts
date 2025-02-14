import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Roles } from '@module/security/security.roles';
import { RolesInterface } from '@module/security/entity/roles.interface';

@Entity('users')
export class User implements RolesInterface {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    nullable: false,
    readOnly: true,
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ type: 'string', nullable: false, enum: Roles })
  @Column({ type: 'enum', enum: Roles })
  public role: Roles;

  @ApiProperty({ type: 'string', nullable: true })
  @Column({ nullable: true })
  public firstName: string;

  @ApiProperty({ type: 'string', nullable: true })
  @Column({ nullable: true })
  public lastName: string;

  @ApiProperty({ type: 'string', nullable: false })
  @Column({ unique: true })
  public email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  public password: string;

  public get roles(): Roles[] {
    return [this.role];
  }
}
