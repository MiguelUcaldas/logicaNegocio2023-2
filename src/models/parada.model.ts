import {Entity, model, property, hasMany} from '@loopback/repository';
import {Viaje} from './viaje.model';
import {Cliente} from './cliente.model';
import {Conductor} from './conductor.model';

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
