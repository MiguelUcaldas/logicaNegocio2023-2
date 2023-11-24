import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Arista} from '../graph/arista';
import {Graph} from '../graph/graph';
import {Node} from '../graph/node';
import {DistanciaRepository, ParadaRepository} from '../repositories';
import {Distancia} from '../models';


@injectable({scope: BindingScope.TRANSIENT})
export class GraphService {
  constructor(
    @repository(ParadaRepository)
    private paradaRepository: ParadaRepository,
    @repository(DistanciaRepository)
    private distanciaRepository: DistanciaRepository,

  ) { }

  async cargarNodos() {
    let nodos: Node[] = [];
    await this.paradaRepository.find().then(async paradas => {
      for await (const parada of paradas) {
        let nodo = new Node(parada.clave, [],parada.nombre);
        nodos.push(nodo);
      };
    });
    return nodos;
  }

 async cargarAristas() {
    let aristas: Arista[] = [];
  await  this.distanciaRepository.find().then(async distancias => {
    for await (const distancia of distancias){
      let arista = new Arista(distancia.origen,distancia.destino,distancia.distancia);
      aristas.push(arista)
    };})
  return aristas}
  //

}//fin
