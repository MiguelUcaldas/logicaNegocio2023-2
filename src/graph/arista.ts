export class Arista {
  origen: string;
  destino: string;
  peso = 0;

// constructor de la clase arista
  constructor(origen: string, destino: string, peso: number) {
    this.origen = origen;
    this.destino = destino;
    this.peso = peso;
  }

  // metodos set y get de la clase arista
  setOrigen(origen: string) {
    this.origen = origen;
  }

  getOrigen() {
    return this.origen;
  }

  setDestino(destino: string) {
    this.destino = destino;
  }

  getDestino() {
    return this.destino;
  }

  setPeso(peso: number) {
    this.peso = peso;
  }

  getPeso() {
    return this.peso;
  }



}
