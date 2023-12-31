import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Parada,
  Cliente,
} from '../models';
import {ParadaRepository} from '../repositories';

export class ParadaClienteController {
  constructor(
    @repository(ParadaRepository) protected paradaRepository: ParadaRepository,
  ) { }

  @get('/paradas/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Parada has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.paradaRepository.clientes(id).find(filter);
  }

  @post('/paradas/{id}/clientes', {
    responses: {
      '200': {
        description: 'Parada model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Parada.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInParada',
            exclude: ['id'],
            optional: ['paradaId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.paradaRepository.clientes(id).create(cliente);
  }

  @patch('/paradas/{id}/clientes', {
    responses: {
      '200': {
        description: 'Parada.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.paradaRepository.clientes(id).patch(cliente, where);
  }

  @del('/paradas/{id}/clientes', {
    responses: {
      '200': {
        description: 'Parada.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.paradaRepository.clientes(id).delete(where);
  }
}
