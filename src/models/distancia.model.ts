import {Entity, model, property} from '@loopback/repository';

@model()
export class Distancia extends Entity {
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
  origen: string;

  @property({
    type: 'number',
    required: true,
  })
  distancia: number;

  @property({
    type: 'string',
    required: true,
  })
  destino: string;


  constructor(data?: Partial<Distancia>) {
    super(data);
  }
}

export interface DistanciaRelations {
  // describe navigational properties here
}

export type DistanciaWithRelations = Distancia & DistanciaRelations;
