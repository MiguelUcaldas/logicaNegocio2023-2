import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Conductor} from './conductor.model';
import {Parada} from './parada.model';

@model()
export class Viaje extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: "boolean",

  })
  estado?: boolean;


  @belongsTo(() => Conductor)
  conductorId: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  @belongsTo(() => Parada, {name: 'destino'})
  paradaId: number;

  constructor(data?: Partial<Viaje>) {
    super(data);
  }
}

export interface ViajeRelations {
  // describe navigational properties here
}

export type ViajeWithRelations = Viaje & ViajeRelations;
