import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Distancia, DistanciaRelations} from '../models';

export class DistanciaRepository extends DefaultCrudRepository<
  Distancia,
  typeof Distancia.prototype.id,
  DistanciaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Distancia, dataSource);
  }
}
