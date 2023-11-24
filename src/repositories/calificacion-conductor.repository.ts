import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CalificacionConductor, CalificacionConductorRelations, Conductor, Cliente} from '../models';
import {ConductorRepository} from './conductor.repository';
import {ClienteRepository} from './cliente.repository';

export class CalificacionConductorRepository extends DefaultCrudRepository<
  CalificacionConductor,
  typeof CalificacionConductor.prototype.id,
  CalificacionConductorRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof CalificacionConductor.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof CalificacionConductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(CalificacionConductor, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
