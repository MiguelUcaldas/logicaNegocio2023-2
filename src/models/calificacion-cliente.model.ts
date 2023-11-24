import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Conductor} from './conductor.model';

@model()
export class CalificacionCliente extends Entity {
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
    type: 'number',

  })
  puntuacion?: number;

  @property({
    type: 'date',
  })
  fecha?: string;

  @property({
    type: 'string',
  })
  comentario?: string;




  @belongsTo(() => Cliente)
  clienteId: number;

  @belongsTo(() => Conductor)
  conductorId: number;

  constructor(data?: Partial<CalificacionCliente>) {
    super(data);
  }
}

export interface CalificacionClienteRelations {
  // describe navigational properties here
}

export type CalificacionClienteWithRelations = CalificacionCliente & CalificacionClienteRelations;
