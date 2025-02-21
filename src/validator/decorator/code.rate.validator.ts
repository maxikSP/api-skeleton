import {
  registerDecorator,
  ValidatorConstraint,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@liaoliaots/nestjs-redis';
import AppContext from '@module/app.context';

@ValidatorConstraint({ async: true })
export class CodeRateConstraint implements ValidatorConstraintInterface {
  public async validate(
    value: any,
    args?: ValidationArguments,
  ): Promise<boolean> {
    const redisService = AppContext.getService(RedisService) as RedisService;
    const configService = AppContext.getService(ConfigService) as ConfigService;

    const codeTTL = configService.get('VERIFICATION_CODE_TTL');
    const codeRate = configService.get('VERIFICATION_CODE_RATE');

    const ttl: number = await redisService
      .getOrThrow('default')
      .ttl(value as string);

    return !(ttl > codeTTL - codeRate);
  }

  public defaultMessage(args?: ValidationArguments): string {
    return 'You have to wait for a 30 seconds before request a new verification code.';
  }
}

export const CodeRate = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CodeRateConstraint,
    });
  };
};
