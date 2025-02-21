import { RolesBuilder } from 'nest-access-control';

export enum Roles {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

export const RolesBuilderConfig = new RolesBuilder();

RolesBuilderConfig.grant(Roles.USER)
  .createAny(['file'])
  .readAny(['user', 'file'])
  .readOwn(['user', 'file'])
  .updateOwn(['user'])
  .deleteOwn(['user', 'file']);

RolesBuilderConfig.grant(Roles.ADMIN)
  .extend([Roles.USER])
  .createAny(['user', 'file'])
  .updateAny(['user', 'file'])
  .deleteAny(['user', 'file']);
