import { INestApplicationContext } from '@nestjs/common';

export default class AppContext {
  static context: INestApplicationContext;

  static setContext(context: INestApplicationContext): void {
    this.context = context;
  }

  static getContext(): INestApplicationContext {
    return this.context;
  }

  static getService(token: string | symbol | Function): any {
    return this.context.get(token);
  }
}
