import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Viaje} from './viaje.model';
import {Parada} from './parada.model';
import {CalificacionCliente} from './calificacion-cliente.model';

@model()
export class Cliente extends Entity {
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
  primerNombre: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @property({
    type: 'number',
    required: true,
  })
  calificacion: number;

  @property({
    type: 'boolean',
    required: true,
  })
  bloqueo: boolean;

  @property({
    type: 'string',
  })
  comentarioBloqueo?: string;

  @hasMany(() => Viaje)
  viajes: Viaje[];

  @belongsTo(() => Parada, {name: 'paradaCliente'})
  paradaId: number;

  @hasMany(() => CalificacionCliente)
  calificacionClientes: CalificacionCliente[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
