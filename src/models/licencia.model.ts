import {Entity, model, property} from '@loopback/repository';


@model()
export class Licencia extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'date',
    required: true,
  })
  vigencia: string;



  constructor(data?: Partial<Licencia>) {
    super(data);
  }
}

export interface LicenciaRelations {
  // describe navigational properties here
}

export type LicenciaWithRelations = Licencia & LicenciaRelations;
