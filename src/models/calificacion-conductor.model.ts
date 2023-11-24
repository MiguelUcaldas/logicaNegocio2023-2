import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Conductor} from './conductor.model';
import {Cliente} from './cliente.model';
import {CalificacionCliente} from './calificacion-cliente.model';

@model()
export class CalificacionConductor extends Entity {
  create(calificacionCliente: CalificacionCliente) {
    throw new Error('Method not implemented.');
  }
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',

  })
  fecha?: string;

  @property({
    type: 'number',

  })
  puntuacion?: number;

  @property({
    type: 'string',
  })
  comentario?: string;



  @belongsTo(() => Conductor)
  conductorId: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<CalificacionConductor>) {
    super(data);
  }
}

export interface CalificacionConductorRelations {
  // describe navigational properties here
}

export type CalificacionConductorWithRelations = CalificacionConductor & CalificacionConductorRelations;
