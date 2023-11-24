import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Licencia} from './licencia.model';
import {Viaje} from './viaje.model';
import {Parada} from './parada.model';
import {CalificacionConductor} from './calificacion-conductor.model';
import {CalificacionCliente} from './calificacion-cliente.model';

@model()
export class Conductor extends Entity {
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
    type: 'boolean',
    required: true,
  })
  disponible: boolean;

  @property({
    type: 'string',
  })
  comentarioBloqueo?: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: number;

  @belongsTo(() => Licencia)
  licenciaId: number;

  @hasMany(() => Viaje)
  viajes: Viaje[];

  @belongsTo(() => Parada, {name: 'paradaConductor'})
  paradaId: number;

  @hasMany(() => CalificacionConductor)
  calificacionConductors: CalificacionConductor[];

  @hasMany(() => CalificacionCliente)
  calificacionClientes: CalificacionCliente[];

  constructor(data?: Partial<Conductor>) {
    super(data);
  }
}

export interface ConductorRelations {
  // describe navigational properties here
}

export type ConductorWithRelations = Conductor & ConductorRelations;
