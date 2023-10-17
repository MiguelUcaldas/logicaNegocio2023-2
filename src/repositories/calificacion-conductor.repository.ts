import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CalificacionConductor, CalificacionConductorRelations, Conductor} from '../models';
import {ConductorRepository} from './conductor.repository';

export class CalificacionConductorRepository extends DefaultCrudRepository<
  CalificacionConductor,
  typeof CalificacionConductor.prototype.id,
  CalificacionConductorRelations
> {

  public readonly conductor: BelongsToAccessor<Conductor, typeof CalificacionConductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(CalificacionConductor, dataSource);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
  }
}
