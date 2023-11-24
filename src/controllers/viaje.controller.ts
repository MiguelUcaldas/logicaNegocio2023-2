import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Graph} from '../graph/graph';
import {CalificacionCliente, CalificacionConductor, SolicitarViaje, Viaje} from '../models';
import {CalificacionClienteRepository, CalificacionConductorRepository, ClienteRepository, ParadaRepository, ViajeRepository} from '../repositories';
import {GraphService, ServiciosLogicaNegocioService} from '../services';

export class ViajeController {
  constructor(
    @repository(ViajeRepository)
    public viajeRepository: ViajeRepository,
    @service(ServiciosLogicaNegocioService)
    public servicioLogicaNegocio: ServiciosLogicaNegocioService,
    @repository(ParadaRepository)
    public paradaRepository: ParadaRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(CalificacionClienteRepository)
    public calificacionClienteRepository: CalificacionClienteRepository,
    @repository(CalificacionConductorRepository)
    public calificacionConductorRepository: CalificacionConductorRepository,
    @service(GraphService)
    public servicioGrafo: GraphService,
  ) { }

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

  // crear metodo post para solicitar un viaje y crear el grafo
  // denytro del método, crear una instancia de la clase graph
  // asignarñe a ña propiedad nodos de ese grafo la lista de nodos que retorna el método cargarNodos
  // luego con ese grafo, se le pasa como parametro al cargar aristas, y allá se manipual ese grafo y se agregan las aristas cargadas
  // imprimir grafo  @get('/viajes/count')

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
  ): Promise<Viaje> {

    let cliente = await this.clienteRepository.findById(viaje.idCliente);
    let origen = await this.paradaRepository.findById(cliente.paradaId);
    let destino = await this.paradaRepository.findById(viaje.destino);
    let conductor = await this.servicioLogicaNegocio.AsignarConductor(origen);
    let vertices = await this.servicioGrafo.cargarNodos();
    let aristas = await this.servicioGrafo.cargarAristas();

    let grafo = new Graph(vertices, aristas);
    grafo.cargarAdyacencias();
    let pesoTotal = grafo.caminoMasCorto(origen.clave, destino.clave);
    console.log("La distancia total recorrida es: " + pesoTotal+" Km")


    /*
    //imprime los vertices y aristas
    grafo.Lstvertices.forEach(v => {
      console.log(v.getDato() + " = " + v.getNombre() + " Adyacencias = [ " + v.getAdyacencias() + " ]")
    })
    grafo.Lstaristas.forEach(a => {
      console.log(" Origen= (" + a.getOrigen() + ") Destino= (" + a.getDestino() + ") Peso= " + a.getPeso())
    })
*/

    //si todas las variables contienen datos se crea el viaje
    if (cliente && origen && destino && conductor) {

      let viajeCompleto = new Viaje();
      // aqui se usa exclamacion porque se sabe que conductor no es null
      viajeCompleto.clienteId = cliente.id!;
      viajeCompleto.conductorId = conductor.id!;
      viajeCompleto.paradaId = destino.id!;
      viajeCompleto.estado = true;

      return this.viajeRepository.create(viajeCompleto);

    }
    else {
      throw new Error("No se pudo crear el viaje");
    }


  }






}
