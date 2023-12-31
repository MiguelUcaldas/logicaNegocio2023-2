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
import {Conductor, ConductoresDisponibles} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorController {
  constructor(
    @repository(ConductorRepository)
    public conductorRepository : ConductorRepository,
  ) {}

  @post('/conductors')
  @response(200, {
    description: 'Conductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Conductor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {
            title: 'NewConductor',
            exclude: ['id'],
          }),
        },
      },
    })
    conductor: Omit<Conductor, 'id'>,
  ): Promise<Conductor> {
    return this.conductorRepository.create(conductor);
  }

  @get('/conductors/count')
  @response(200, {
    description: 'Conductor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Conductor) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.conductorRepository.count(where);
  }

  @get('/conductors')
  @response(200, {
    description: 'Array of Conductor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Conductor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Conductor) filter?: Filter<Conductor>,
  ): Promise<Conductor[]> {
    return this.conductorRepository.find(filter);
  }

  @patch('/conductors')
  @response(200, {
    description: 'Conductor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {partial: true}),
        },
      },
    })
    conductor: Conductor,
    @param.where(Conductor) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.conductorRepository.updateAll(conductor, where);
  }

  @get('/conductors/{id}')
  @response(200, {
    description: 'Conductor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Conductor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Conductor, {exclude: 'where'}) filter?: FilterExcludingWhere<Conductor>
  ): Promise<Conductor> {
    return this.conductorRepository.findById(id, filter);
  }

  @patch('/conductors/{id}')
  @response(204, {
    description: 'Conductor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {partial: true}),
        },
      },
    })
    conductor: Conductor,
  ): Promise<void> {
    await this.conductorRepository.updateById(id, conductor);
  }

  @put('/conductors/{id}')
  @response(204, {
    description: 'Conductor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() conductor: Conductor,
  ): Promise<void> {
    await this.conductorRepository.replaceById(id, conductor);
  }

  @del('/conductors/{id}')
  @response(204, {
    description: 'Conductor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.conductorRepository.deleteById(id);
  }

  //metodo

  @post('/conductoresDisponibles')
  @response(200, {
    description: 'Conductor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Conductor)}},
  })
  async createDisponibles(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConductoresDisponibles),
        },
      },
    })
    conductoresDisponibles: ConductoresDisponibles,
  ): Promise<Conductor[]> {
    let conductores = await this.conductorRepository.find({
      where:{
        paradaId: conductoresDisponibles.parada,

      }
    });
    return conductores;
  }

}

