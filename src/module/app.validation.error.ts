import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { ValidationError } from '@nestjs/common';
import { flatten } from 'lodash';

export interface AppValidationErrorMessage extends ValidationError {
  message: string;
}

export class AppValidationError extends BadRequestException {
  constructor(errors: ValidationError[]) {
    const mapped: AppValidationErrorMessage[][] = errors.map(
      (error: ValidationError): AppValidationErrorMessage[] => {
        const messages: string[] = Object.values(error.constraints ?? []);

        return messages.map(
          (message: string): AppValidationErrorMessage => ({
            property: error.property,
            value: error.value as unknown,
            message,
          }),
        );
      },
    );

    super(flatten(mapped));
  }
}
