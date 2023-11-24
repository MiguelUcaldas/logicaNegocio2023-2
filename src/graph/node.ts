


// class for Node of a graph with id, label, address, and edges
export class Node {
  dato: string;
  nombre: string;
  adyacencias: string[];

  constructor(dato: string,  adyacencias:[], nombre:string) {
    this.dato = dato;
    this.nombre = nombre;
    this.adyacencias = adyacencias;
  }


  // set id of node
  setDato(dato: string) {
    this.dato = dato;
  }

  getDato() {
    return this.dato;
  }

  // set of adyacencias
  setAdyacencias(adyacencias: []) {
    this.adyacencias = adyacencias;
  }

  //get of adyacencias
  getAdyacencias() {
    return this.adyacencias;
  }

  getNombre(){
    return this.nombre;
  }
  setNombre(nombre:string){
    this.nombre = nombre;
  }
  agregarAdyacencia(adyacencia: string) {
    this.adyacencias.push(adyacencia);
  }

}
