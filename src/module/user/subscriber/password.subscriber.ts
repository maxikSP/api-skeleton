import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from '@module/user/entity/user';
import { hash } from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  public listenTo(): Function {
    return User;
  }

  public async beforeInsert(event: InsertEvent<User>): Promise<void> {
    event.entity.password = await hash(event.entity.password, 2);
  }

  public async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    if (
      event.entity &&
      event.entity.password !== event.databaseEntity.password
    ) {
      event.entity.password = await hash(event.entity.password, 2);
    }
  }
}
