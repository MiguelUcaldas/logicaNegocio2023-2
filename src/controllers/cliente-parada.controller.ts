import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Parada,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteParadaController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/parada', {
    responses: {
      '200': {
        description: 'Parada belonging to Cliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parada),
          },
        },
      },
    },
  })
  async getParada(
    @param.path.number('id') id: typeof Cliente.prototype.id,
  ): Promise<Parada> {
    return this.clienteRepository.paradaCliente(id);
  }
}
