import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Cliente, Conductor, Parada, } from '../models';
import {ClienteRepository, ConductorRepository, ParadaRepository} from '../repositories';
import {publicDecrypt} from 'crypto';
import {HttpErrors} from '@loopback/rest';

@injectable({scope: BindingScope.TRANSIENT})
export class ServiciosLogicaNegocioService {
  constructor(/* Add @inject to inject parameters */
  @repository(ParadaRepository)
  public paradaRepository : ParadaRepository,
  @repository(ClienteRepository)
  public clienteRepository : ClienteRepository,
  @repository(ConductorRepository)
  public conductorRepository : ConductorRepository,

  ) {}


  /*el siguiente metodo debe recibir la clave de una parada y retornar el objeto parada
   */

//el siguiente metodo debe recibir el id de un cliente y retornar el objeto cliente
// si el cliente no se encuentra bloqueado

// se asignara un conductor que coincida con la parada que entra siempre y cuando el conductor
// este disponible
async AsignarConductor(parada: Parada): Promise<Conductor | null>{

  let conductore = await this.conductorRepository.findOne({
    where: {paradaId: parada.id,
           disponible: true
             }
              });
  if(conductore){
  return conductore as Conductor;}
  else{
    throw HttpErrors[404]("No hay conductores disponibles en su zona");
    return null;
  }
  }



}//final
