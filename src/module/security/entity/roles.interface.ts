import { Roles } from '@module/security/security.roles';

export interface RolesInterface {
  get roles(): Roles[];
}
