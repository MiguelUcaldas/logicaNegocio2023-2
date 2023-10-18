import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Conductor} from './conductor.model';
import {Viaje} from './viaje.model';

@model()
export class Parada extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => Viaje)
  viajes: Viaje[];

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Conductor)
  conductors: Conductor[];

  constructor(data?: Partial<Parada>) {
    super(data);
  }
}

export interface ParadaRelations {
  // describe navigational properties here
}

export type ParadaWithRelations = Parada & ParadaRelations;
