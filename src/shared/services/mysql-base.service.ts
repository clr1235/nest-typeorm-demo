import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindOneOptions,
  ObjectLiteral,
  QueryDeepPartialEntity,
  Repository,
} from 'typeorm';

@Injectable()
export abstract class MysqlBaseService<T extends ObjectLiteral> {
  constructor(protected repository: Repository<T>) {}

  async findAll() {
    return this.repository.find();
  }
  async findOne(options: FindOneOptions<T>) {
    return await this.repository.findOne(options);
  }
  async create(createDto: DeepPartial<T>) {
    // save会实现插入和更新操作
    const entity = await this.repository.save(createDto);
    console.log(entity, 'entity===');
    return entity;
  }

  async update(id: number, updateDto: QueryDeepPartialEntity<T>) {
    const entity = await this.repository.update(id, updateDto);

    return entity;
  }

  async delete(id: number) {
    const entity = await this.repository.delete(id);

    return entity;
  }
  // async findAll() {
  //   return this.repository.find();
  // }
  // async findAll() {
  //   return this.repository.find();
  // }
}
