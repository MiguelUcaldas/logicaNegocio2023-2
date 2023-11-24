import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Conductor, ConductorRelations, Vehiculo, Licencia, Viaje, Parada, CalificacionConductor, CalificacionCliente} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {LicenciaRepository} from './licencia.repository';
import {ViajeRepository} from './viaje.repository';
import {ParadaRepository} from './parada.repository';
import {CalificacionConductorRepository} from './calificacion-conductor.repository';
import {CalificacionClienteRepository} from './calificacion-cliente.repository';

export class ConductorRepository extends DefaultCrudRepository<
  Conductor,
  typeof Conductor.prototype.id,
  ConductorRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Conductor.prototype.id>;

  public readonly licencia: BelongsToAccessor<Licencia, typeof Conductor.prototype.id>;

  public readonly viajes: HasManyRepositoryFactory<Viaje, typeof Conductor.prototype.id>;

  public readonly paradaConductor: BelongsToAccessor<Parada, typeof Conductor.prototype.id>;

  public readonly calificacionConductors: HasManyRepositoryFactory<CalificacionConductor, typeof Conductor.prototype.id>;

  public readonly calificacionClientes: HasManyRepositoryFactory<CalificacionCliente, typeof Conductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('LicenciaRepository') protected licenciaRepositoryGetter: Getter<LicenciaRepository>, @repository.getter('ViajeRepository') protected viajeRepositoryGetter: Getter<ViajeRepository>, @repository.getter('ParadaRepository') protected paradaRepositoryGetter: Getter<ParadaRepository>, @repository.getter('CalificacionConductorRepository') protected calificacionConductorRepositoryGetter: Getter<CalificacionConductorRepository>, @repository.getter('CalificacionClienteRepository') protected calificacionClienteRepositoryGetter: Getter<CalificacionClienteRepository>,
  ) {
    super(Conductor, dataSource);
    this.calificacionClientes = this.createHasManyRepositoryFactoryFor('calificacionClientes', calificacionClienteRepositoryGetter,);
    this.registerInclusionResolver('calificacionClientes', this.calificacionClientes.inclusionResolver);
    this.calificacionConductors = this.createHasManyRepositoryFactoryFor('calificacionConductors', calificacionConductorRepositoryGetter,);
    this.registerInclusionResolver('calificacionConductors', this.calificacionConductors.inclusionResolver);
    this.paradaConductor = this.createBelongsToAccessorFor('paradaConductor', paradaRepositoryGetter,);
    this.registerInclusionResolver('paradaConductor', this.paradaConductor.inclusionResolver);
    this.viajes = this.createHasManyRepositoryFactoryFor('viajes', viajeRepositoryGetter,);
    this.registerInclusionResolver('viajes', this.viajes.inclusionResolver);
    this.licencia = this.createBelongsToAccessorFor('licencia', licenciaRepositoryGetter,);
    this.registerInclusionResolver('licencia', this.licencia.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
