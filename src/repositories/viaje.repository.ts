import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Viaje, ViajeRelations, Conductor, Cliente, Parada} from '../models';
import {ConductorRepository} from './conductor.repository';
import {ClienteRepository} from './cliente.repository';
import {ParadaRepository} from './parada.repository';

export class ViajeRepository extends DefaultCrudRepository<
  Viaje,
  typeof Viaje.prototype.id,
  ViajeRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof Viaje.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Viaje.prototype.id>;

  public readonly destino: BelongsToAccessor<Parada, typeof Viaje.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ParadaRepository') protected paradaRepositoryGetter: Getter<ParadaRepository>,
  ) {
    super(Viaje, dataSource);
    this.destino = this.createBelongsToAccessorFor('destino', paradaRepositoryGetter,);
    this.registerInclusionResolver('destino', this.destino.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
