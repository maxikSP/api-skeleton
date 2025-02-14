import { RolesBuilder } from 'nest-access-control';

export enum Roles {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

export const RolesBuilderConfig = new RolesBuilder();
