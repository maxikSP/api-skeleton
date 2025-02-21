import {
  registerDecorator,
  ValidatorConstraint,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RedisService } from '@liaoliaots/nestjs-redis';
import AppContext from '@module/app.context';

@ValidatorConstraint({ async: true })
export class CodeConstraint implements ValidatorConstraintInterface {
  public async validate(
    value: any,
    args: ValidationArguments,
  ): Promise<boolean> {
    const [field] = args.constraints;
    // @ts-ignore
    const fieldValue = args.object[field];

    const redisService = AppContext.getService(RedisService) as RedisService;
    const f = await redisService.getOrThrow('default').get(fieldValue as string);
    return (
      value ===
      (await redisService.getOrThrow('default').get(fieldValue as string))
    );
  }

  public defaultMessage(args?: ValidationArguments): string {
    return 'Invalid verification code.';
  }
}

export const Code = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: CodeConstraint,
    });
  };
};
