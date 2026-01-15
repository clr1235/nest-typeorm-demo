import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export abstract class MysqlBaseService<T extends ObjectLiteral> {
  constructor(protected repository: Repository<T>) {}

  async findAll() {
    return this.repository.find();
  }
}
