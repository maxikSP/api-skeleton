import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { User } from '@module/user/entity/user';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) protected readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  public findById(id: string): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  public findByUsername(username: string): Promise<User | null> {
    return this.repo.findOneBy({ email: username });
  }
}
