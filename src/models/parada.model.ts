import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Parada>) {
    super(data);
  }
}

export interface ParadaRelations {
  // describe navigational properties here
}

export type ParadaWithRelations = Parada & ParadaRelations;
