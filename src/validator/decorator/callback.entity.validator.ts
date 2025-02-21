import { INestApplicationContext } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import AppContext from '@module/app.context';

export interface CallbackEntityConstraintScope {
  object: any;
  context: INestApplicationContext;
  manager: EntityManager;
}

@ValidatorConstraint({ async: true })
export class CallbackEntityConstraint implements ValidatorConstraintInterface {
  public validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [callback] = args.constraints;

    return callback({
      object: args.object,
      context: AppContext.getContext(),
      manager: AppContext.getService(EntityManager) as EntityManager,
    });
  }

  public defaultMessage(args?: ValidationArguments): string {
    return `Callback validation failed.`;
  }
}

export const CallbackEntity = (
  callback: (
    scope: CallbackEntityConstraintScope,
  ) => Promise<boolean> | boolean,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [callback],
      validator: CallbackEntityConstraint,
    });
  };
};
