import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Viaje, Parada, CalificacionCliente, CalificacionConductor} from '../models';
import {ViajeRepository} from './viaje.repository';
import {ParadaRepository} from './parada.repository';
import {CalificacionClienteRepository} from './calificacion-cliente.repository';
import {CalificacionConductorRepository} from './calificacion-conductor.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly viajes: HasManyRepositoryFactory<Viaje, typeof Cliente.prototype.id>;

  public readonly paradaCliente: BelongsToAccessor<Parada, typeof Cliente.prototype.id>;

  public readonly calificacionClientes: HasManyRepositoryFactory<CalificacionCliente, typeof Cliente.prototype.id>;

  public readonly calificacionConductors: HasManyRepositoryFactory<CalificacionConductor, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('ParadaRepository') protected paradaRepositoryGetter: Getter<ParadaRepository>, @repository.getter('CalificacionClienteRepository') protected calificacionClienteRepositoryGetter: Getter<CalificacionClienteRepository>, @repository.getter('CalificacionConductorRepository') protected calificacionConductorRepositoryGetter: Getter<CalificacionConductorRepository>,
  ) {
    super(Cliente, dataSource);
    this.calificacionConductors = this.createHasManyRepositoryFactoryFor('calificacionConductors', calificacionConductorRepositoryGetter,);
    this.registerInclusionResolver('calificacionConductors', this.calificacionConductors.inclusionResolver);
    this.calificacionClientes = this.createHasManyRepositoryFactoryFor('calificacionClientes', calificacionClienteRepositoryGetter,);
    this.registerInclusionResolver('calificacionClientes', this.calificacionClientes.inclusionResolver);
    this.paradaCliente = this.createBelongsToAccessorFor('paradaCliente', paradaRepositoryGetter,);
    this.registerInclusionResolver('paradaCliente', this.paradaCliente.inclusionResolver);
    this.viajes = this.createHasManyRepositoryFactoryFor('viajes', viajeRepositoryGetter,);
    this.registerInclusionResolver('viajes', this.viajes.inclusionResolver);
  }
}
