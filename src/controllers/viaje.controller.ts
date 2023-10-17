import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Viaje} from '../models';
import {ViajeRepository} from '../repositories';

export class ViajeController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository : ViajeRepository,
  ) {}

  @post('/viajes')
  @response(200, {
    description: 'Viaje model instance',
    content: {'application/json': {schema: getModelSchemaRef(Viaje)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {
            title: 'NewViaje',
            exclude: ['id'],
          }),
        },
      },
    })
    viaje: Omit<Viaje, 'id'>,
  ): Promise<Viaje> {
    return this.viajeRepository.create(viaje);
  }

  @get('/viajes/count')
  @response(200, {
    description: 'Viaje model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Viaje) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.viajeRepository.count(where);
  }

  @get('/viajes')
  @response(200, {
    description: 'Array of Viaje model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Viaje, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Viaje) filter?: Filter<Viaje>,
  ): Promise<Viaje[]> {
    return this.viajeRepository.find(filter);
  }

  @patch('/viajes')
  @response(200, {
    description: 'Viaje PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {partial: true}),
        },
      },
    })
    viaje: Viaje,
    @param.where(Viaje) where?: Where<Viaje>,
  ): Promise<Count> {
    return this.viajeRepository.updateAll(viaje, where);
  }

  @get('/viajes/{id}')
  @response(200, {
    description: 'Viaje model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Viaje, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Viaje, {exclude: 'where'}) filter?: FilterExcludingWhere<Viaje>
  ): Promise<Viaje> {
    return this.viajeRepository.findById(id, filter);
  }

  @patch('/viajes/{id}')
  @response(204, {
    description: 'Viaje PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Viaje, {partial: true}),
        },
      },
    })
    viaje: Viaje,
  ): Promise<void> {
    await this.viajeRepository.updateById(id, viaje);
  }

  @put('/viajes/{id}')
  @response(204, {
    description: 'Viaje PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() viaje: Viaje,
  ): Promise<void> {
    await this.viajeRepository.replaceById(id, viaje);
  }

  @del('/viajes/{id}')
  @response(204, {
    description: 'Viaje DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.viajeRepository.deleteById(id);
  }
}
