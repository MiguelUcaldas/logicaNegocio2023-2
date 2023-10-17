import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Conductor, ConductorRelations, Vehiculo, Licencia} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {LicenciaRepository} from './licencia.repository';

export class ConductorRepository extends DefaultCrudRepository<
  Conductor,
  typeof Conductor.prototype.id,
  ConductorRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Conductor.prototype.id>;

  public readonly licencia: BelongsToAccessor<Licencia, typeof Conductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('LicenciaRepository') protected licenciaRepositoryGetter: Getter<LicenciaRepository>,
  ) {
    super(Conductor, dataSource);
    this.licencia = this.createBelongsToAccessorFor('licencia', licenciaRepositoryGetter,);
    this.registerInclusionResolver('licencia', this.licencia.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
