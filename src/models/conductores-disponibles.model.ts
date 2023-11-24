import {Model, model, property} from '@loopback/repository';

@model()
export class ConductoresDisponibles extends Model {
  @property({
    type: 'number',
  })
  parada?: number;


  constructor(data?: Partial<ConductoresDisponibles>) {
    super(data);
  }
}

export interface ConductoresDisponiblesRelations {
  // describe navigational properties here
}

export type ConductoresDisponiblesWithRelations = ConductoresDisponibles & ConductoresDisponiblesRelations;
