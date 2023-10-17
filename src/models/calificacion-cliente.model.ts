import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class CalificacionCliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  puntuacion: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  comentario?: string;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<CalificacionCliente>) {
    super(data);
  }
}

export interface CalificacionClienteRelations {
  // describe navigational properties here
}

export type CalificacionClienteWithRelations = CalificacionCliente & CalificacionClienteRelations;
