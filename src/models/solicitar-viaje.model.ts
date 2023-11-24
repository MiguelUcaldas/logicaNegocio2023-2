import {Model, model, property} from '@loopback/repository';

@model()
export class SolicitarViaje extends Model {
  @property({
    type: 'number',
    required: true,
  })
  idCliente: number;


  @property({
    type: 'number',
    required: true,
  })
  destino: number;


  constructor(data?: Partial<SolicitarViaje>) {
    super(data);
  }
}

export interface SolicitarViajeRelations {
  // describe navigational properties here
}

export type SolicitarViajeWithRelations = SolicitarViaje & SolicitarViajeRelations;
