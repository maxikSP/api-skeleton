import { RolesBuilder } from 'nest-access-control';

export enum Roles {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

export const RolesBuilderConfig = new RolesBuilder();

RolesBuilderConfig.grant(Roles.USER)
  .createAny(['files'])
  .readAny(['user', 'files'])
  .readOwn(['user', 'files'])
  .updateOwn(['user'])
  .deleteOwn(['user', 'files']);

RolesBuilderConfig.grant(Roles.ADMIN)
  .extend([Roles.USER])
  .createAny(['user', 'files'])
  .updateAny(['user', 'files'])
  .deleteAny(['user', 'files']);
