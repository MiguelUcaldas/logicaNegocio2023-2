import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Parada, ParadaRelations, Viaje, Cliente, Conductor} from '../models';
import {ViajeRepository} from './viaje.repository';
import {ClienteRepository} from './cliente.repository';
import {ConductorRepository} from './conductor.repository';

export class ParadaRepository extends DefaultCrudRepository<
  Parada,
  typeof Parada.prototype.id,
  ParadaRelations
> {

  public readonly viajes: HasManyRepositoryFactory<Viaje, typeof Parada.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Parada.prototype.id>;

  public readonly conductors: HasManyRepositoryFactory<Conductor, typeof Parada.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(Parada, dataSource);
    this.conductors = this.createHasManyRepositoryFactoryFor('conductors', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductors', this.conductors.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.viajes = this.createHasManyRepositoryFactoryFor('viajes', viajeRepositoryGetter,);
    this.registerInclusionResolver('viajes', this.viajes.inclusionResolver);
  }
}
