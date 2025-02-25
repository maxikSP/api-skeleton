import {
  registerDecorator,
  ValidatorConstraint,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';

export interface CallbackConstraintScope {
  object: any;
}

@ValidatorConstraint({ async: true })
export class CallbackConstraint implements ValidatorConstraintInterface {
  public validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [callback] = args.constraints;

    return callback({
      object: args.object,
    });
  }

  public defaultMessage(args?: ValidationArguments): string {
    return `Callback validation failed.`;
  }
}

export const Callback = (
  callback: (scope: CallbackConstraintScope) => Promise<boolean> | boolean,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [callback],
      validator: CallbackConstraint,
    });
  };
};
