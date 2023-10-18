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
import { CalificacionCliente, CalificacionCliente, CalificacionConductor, SolicitarViaje, Viaje} from '../models';
import {ClienteRepository, ParadaRepository, ViajeRepository} from '../repositories';
import {service} from '@loopback/core';
import {ServiciosLogicaNegocioService} from '../services';

export class ViajeController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository : ViajeRepository,
    @service(ServiciosLogicaNegocioService)
    public servicios : ServiciosLogicaNegocioService,
    @repository(ParadaRepository)
    public paradaRepository : ParadaRepository,
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @repository(CalificacionCliente)
    public calificacionClienteRepository : CalificacionCliente,
    @repository(CalificacionConductor)
    public calificacionConductorRepository : CalificacionConductor,
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

  // metodo post para solicitar un viaje haciendo llamado al modelo SolicitarViaje
  @post('/viajes/solicitarViaje')
  @response(200, {
    description: 'solicitar viaje',
    content: {'application/json': {schema: getModelSchemaRef(Viaje)}},
  })
  async solicitarViaje(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitarViaje),
        },
      },
    })
    viaje: SolicitarViaje,
  ): Promise <Viaje> {

    let cliente = await this.clienteRepository.findById(viaje.idCliente);

    let origen = await this.paradaRepository.findById(cliente.paradaId);
    let destino = await this.paradaRepository.findById(viaje.destino);
    let conductor = await this.servicios.AsignarConductor(origen);


    //si todas las variables contienen datos se crea el viaje
    if (cliente && origen && destino && conductor){

      let viajeCompleto = new Viaje();
      // aqui se usa exclamacion porque se sabe que conductor no es null
      viajeCompleto.clienteId = cliente.id!;
      viajeCompleto.conductorId = conductor.id!;
      viajeCompleto.paradaId = destino.id!;

      let calificacionCliente = new CalificacionCliente();
      let calificacionConductor = new CalificacionConductor();

      calificacionCliente.clienteId = cliente.id!;
      calificacionCliente.conductorId = conductor.id!;

      return this.viajeRepository.create(viajeCompleto);


    }
    else{
      throw new Error("No se pudo crear el viaje");
    }

  }






}
