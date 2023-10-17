import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Conductor,
  Parada,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorParadaController {
  constructor(
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/parada', {
    responses: {
      '200': {
        description: 'Parada belonging to Conductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parada),
          },
        },
      },
    },
  })
  async getParada(
    @param.path.number('id') id: typeof Conductor.prototype.id,
  ): Promise<Parada> {
    return this.conductorRepository.paradaConductor(id);
  }
}
