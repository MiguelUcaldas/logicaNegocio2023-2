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
import {CalificacionConductor} from '../models';
import {CalificacionConductorRepository} from '../repositories';

export class CalificacionConductorController {
  constructor(
    @repository(CalificacionConductorRepository)
    public calificacionConductorRepository : CalificacionConductorRepository,
  ) {}

  @post('/calificacion-conductors')
  @response(200, {
    description: 'CalificacionConductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(CalificacionConductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionConductor, {
            title: 'NewCalificacionConductor',
            exclude: ['id'],
          }),
        },
      },
    })
    calificacionConductor: Omit<CalificacionConductor, 'id'>,
  ): Promise<CalificacionConductor> {
    return this.calificacionConductorRepository.create(calificacionConductor);
  }

  @get('/calificacion-conductors/count')
  @response(200, {
    description: 'CalificacionConductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CalificacionConductor) where?: Where<CalificacionConductor>,
  ): Promise<Count> {
    return this.calificacionConductorRepository.count(where);
  }

  @get('/calificacion-conductors')
  @response(200, {
    description: 'Array of CalificacionConductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CalificacionConductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CalificacionConductor) filter?: Filter<CalificacionConductor>,
  ): Promise<CalificacionConductor[]> {
    return this.calificacionConductorRepository.find(filter);
  }

  @patch('/calificacion-conductors')
  @response(200, {
    description: 'CalificacionConductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionConductor, {partial: true}),
        },
      },
    })
    calificacionConductor: CalificacionConductor,
    @param.where(CalificacionConductor) where?: Where<CalificacionConductor>,
  ): Promise<Count> {
    return this.calificacionConductorRepository.updateAll(calificacionConductor, where);
  }

  @get('/calificacion-conductors/{id}')
  @response(200, {
    description: 'CalificacionConductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CalificacionConductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CalificacionConductor, {exclude: 'where'}) filter?: FilterExcludingWhere<CalificacionConductor>
  ): Promise<CalificacionConductor> {
    return this.calificacionConductorRepository.findById(id, filter);
  }

  @patch('/calificacion-conductors/{id}')
  @response(204, {
    description: 'CalificacionConductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CalificacionConductor, {partial: true}),
        },
      },
    })
    calificacionConductor: CalificacionConductor,
  ): Promise<void> {
    await this.calificacionConductorRepository.updateById(id, calificacionConductor);
  }

  @put('/calificacion-conductors/{id}')
  @response(204, {
    description: 'CalificacionConductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() calificacionConductor: CalificacionConductor,
  ): Promise<void> {
    await this.calificacionConductorRepository.replaceById(id, calificacionConductor);
  }

  @del('/calificacion-conductors/{id}')
  @response(204, {
    description: 'CalificacionConductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.calificacionConductorRepository.deleteById(id);
  }
}
