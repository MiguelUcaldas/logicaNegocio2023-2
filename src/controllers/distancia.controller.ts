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
  HttpErrors,
} from '@loopback/rest';
import {Distancia, Parada} from '../models';
import {DistanciaRepository} from '../repositories';
import {ServiciosLogicaNegocioService} from '../services';
import {service} from '@loopback/core';

export class DistanciaController {
  constructor(
    @repository(DistanciaRepository)
    public distanciaRepository : DistanciaRepository,
    @service(ServiciosLogicaNegocioService)
    public servicios : ServiciosLogicaNegocioService,
  ) {}

  @post('/distancias')
  @response(200, {
    description: 'Distancia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Distancia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distancia, {
            title: 'NewDistancia',
            exclude: ['id'],
          }),
        },
      },
    })
    distancia: Omit<Distancia, 'id'>,
  ): Promise<Distancia[]> {

    let verificarVertices = await this.servicios.verificarArista(distancia.origen,distancia.destino)

    if(verificarVertices){

      // crea el opuesto de un para consolidar un grafo no dirigido
      let aristaInvertida = new Distancia();
      aristaInvertida.destino = distancia.origen;
      aristaInvertida.origen = distancia.destino;
      aristaInvertida.distancia = distancia.distancia;

      // crea las aristas
      this.distanciaRepository.create(distancia);
      this.distanciaRepository.create(aristaInvertida);

      return [distancia, aristaInvertida]
    }

    throw HttpErrors[401] ("No existen las claves para las paradas")

  }

  @get('/distancias/count')
  @response(200, {
    description: 'Distancia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Distancia) where?: Where<Distancia>,
  ): Promise<Count> {
    return this.distanciaRepository.count(where);
  }

  @get('/distancias')
  @response(200, {
    description: 'Array of Distancia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Distancia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Distancia) filter?: Filter<Distancia>,
  ): Promise<Distancia[]> {
    return this.distanciaRepository.find(filter);
  }

  @patch('/distancias')
  @response(200, {
    description: 'Distancia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distancia, {partial: true}),
        },
      },
    })
    distancia: Distancia,
    @param.where(Distancia) where?: Where<Distancia>,
  ): Promise<Count> {
    return this.distanciaRepository.updateAll(distancia, where);
  }

  @get('/distancias/{id}')
  @response(200, {
    description: 'Distancia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Distancia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Distancia, {exclude: 'where'}) filter?: FilterExcludingWhere<Distancia>
  ): Promise<Distancia> {
    return this.distanciaRepository.findById(id, filter);
  }

  @patch('/distancias/{id}')
  @response(204, {
    description: 'Distancia PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distancia, {partial: true}),
        },
      },
    })
    distancia: Distancia,
  ): Promise<void> {
    await this.distanciaRepository.updateById(id, distancia);
  }

  @put('/distancias/{id}')
  @response(204, {
    description: 'Distancia PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() distancia: Distancia,
  ): Promise<void> {
    await this.distanciaRepository.replaceById(id, distancia);
  }

  @del('/distancias/{id}')
  @response(204, {
    description: 'Distancia DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.distanciaRepository.deleteById(id);
  }
}
