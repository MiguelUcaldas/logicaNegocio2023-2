import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CalificacionCliente, CalificacionClienteRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class CalificacionClienteRepository extends DefaultCrudRepository<
  CalificacionCliente,
  typeof CalificacionCliente.prototype.id,
  CalificacionClienteRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof CalificacionCliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(CalificacionCliente, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
