// class Graph with a Node List

import {Node} from './node';
import {Arista} from './arista';

export class Graph {
Lstvertices: Node[];
Lstaristas: Arista[];

//constructor of the class Graph
constructor(Lstvertices: Node[], Lstaristas: Arista[]) {
  this.Lstvertices = Lstvertices;
  this.Lstaristas = Lstaristas;}

getLstvertices() {
  return this.Lstvertices;}

setLstvertices(Lstvertices: Node[]) {
  this.Lstvertices = Lstvertices;}

//metodo que verifica que el vertice no se encuentre en la lista de vertices y si no lo agrega
ingresarVertice(vertice: Node) {
  if (!this.Lstvertices.includes(vertice)) {
    this.Lstvertices.push(vertice);
  }}

  //metodo que recibe en dato de la lista de vertices y si lo encuentra lo retorna true
buscarVertice(dato: string) {
  for (let i = 0; i < this.Lstvertices.length; i++) {
    if (this.Lstvertices[i].dato === dato) {
      return true;
    }
    else {return false;}
  }}



  obtenerVertice(dato: string) {
    for (let i = 0; i < this.Lstvertices.length; i++) {
      if (this.Lstvertices[i].dato === dato) {
        return this.Lstvertices[i];
      }}}
  obtenerArista(origen:string,destino:string){
    for (let i = 0; i < this.Lstaristas.length; i++) {
      if (this.Lstaristas[i].origen === origen && this.Lstaristas[i].destino === destino) {
        return this.Lstaristas[i];
      }
  }}

//metodo que verifica que la arista se encuentre si la encuentra retorna false
buscarArista(origen: string, destino: string) {
  for (let i = 0; i < this.Lstaristas.length; i++) {
    if (this.Lstaristas[i].origen === origen && this.Lstaristas[i].destino === destino) {
      return false;
    }
    else {return true;}
  }
}

ingresarArista(origen: string, destino: string, peso: number) {
  if (this.buscarVertice(origen) && this.buscarVertice(destino)) {
    let arista = new Arista(origen, destino, peso);
    let arista2 = new Arista(destino, origen, peso);
    if(this.buscarArista(origen, destino) && this.buscarArista(destino, origen)){
      this.Lstaristas.push(arista);
      this.Lstaristas.push(arista2);
      this.ingresarAdyacencia(origen, destino);
      this.ingresarAdyacencia(destino, origen);
    }
  }
}

cargarAdyacencias() {
  this.Lstaristas.forEach(a => {
    let v = this.obtenerVertice(a.getOrigen());
    v!.agregarAdyacencia(a.getDestino());
  });
}


ingresarAdyacencia(origen: string, destino: string) {
  for (let i = 0; i < this.Lstvertices.length; i++) {
    if (this.Lstvertices[i].dato === origen) {
      this.Lstvertices[i].adyacencias.push(destino);
    }
  }
}
// obtener peso total de recorrido de una lista de vertices
distanciaRecorrida(listaRecorridos: string[]) {
  let pesoTotal = 0;
  // for loop to search for edges in the list of vertices and sum their total weight
  for (let i = 0; i < listaRecorridos.length - 1; i++) {
    let origen = this.obtenerVertice(listaRecorridos[i]);
    let destino = this.obtenerVertice(listaRecorridos[i + 1]);
    if (origen && destino) {
      let arista = this.obtenerArista(origen.dato, destino.dato);
      if (arista) {
        pesoTotal = arista.peso + pesoTotal;
      }
    }
  }

  return pesoTotal
  // return the total weigh
    }





// ----------------------------------------------------------------------------

caminoMasCorto(origen: string, destino: string) {
  const verticesAux: string[] = [];
  const verticesD: string[] = [];
  const caminos = this.dijkstra(origen, verticesAux);
  let cont = 0;

  for (const i of caminos) {
     // console.log(`La distancia mínima a ${this.Lstvertices[cont].getDato()} es ${i}`);
      cont++;
  }

  this.rutas(verticesD, verticesAux, destino, origen);
  console.log(`El camino más corto de ${origen} a ${destino} es: `);
  console.log(verticesD);
  return this.distanciaRecorrida(verticesD)
}

dijkstra(origen: string, verticesAux: string[]): number[] {
  const visitados: boolean[] = [];
  const caminos: number[] = [];

  for (const v of this.Lstvertices) {
    caminos.push(Number.POSITIVE_INFINITY);
    visitados.push(false);
    verticesAux.push(""); // Fix: Changed null to an empty string

    if (v.getDato() === origen) {
      caminos[this.Lstvertices.indexOf(v)] = 0;
      verticesAux[this.Lstvertices.indexOf(v)] = v.getDato();
    }
  }

  while (!this.todosVisitados(visitados)) {
      const menorAux = this.menorNoVisitado(caminos, visitados);

      if (menorAux === null) {
          break;
      }

      const indice = this.Lstvertices.indexOf(menorAux);
      visitados[indice] = true;
      const valorActual = caminos[indice];

      for (const adyacencia of menorAux.getAdyacencias()) {
        const verticeAdyacente = this.obtenerVertice(adyacencia);
        if (verticeAdyacente) {
          const indiceNuevo = this.Lstvertices.indexOf(verticeAdyacente);
          const arista = this.verificarArista(menorAux.getDato(), adyacencia);

          if (arista && caminos[indiceNuevo] > valorActual + arista.getPeso()) {
            caminos[indiceNuevo] = valorActual + arista.getPeso();
            verticesAux[indiceNuevo] = this.Lstvertices[indice].getDato();
          }
        }
      }


  }

  return caminos;
}

verificarArista(origen: string, destino: string): Arista | null {
  for (const arista of this.Lstaristas) {
      if (origen === arista.getOrigen() && destino === arista.getDestino()) {
          return arista;
      }
  }

  return null;
}

todosVisitados(visitados: boolean[]): boolean {
  for (const vertice of visitados) {
      if (!vertice) {
          return false;
      }
  }

  return true;
}

menorNoVisitado(caminos: number[], visitados: boolean[]): Node | null {
  let verticeMenor: Node | null = null;
  const caminosAux = [...caminos].sort((a, b) => a - b);
  const copiaCaminos = [...caminos];
  let bandera = true;
  let cont = 0;

  while (bandera) {
      const menor = caminosAux[cont];

      if (!visitados[copiaCaminos.indexOf(menor)]) {
          verticeMenor = this.Lstvertices[copiaCaminos.indexOf(menor)];
          bandera = false;
      } else {
          copiaCaminos[copiaCaminos.indexOf(menor)] = -1;
          cont++;
      }
  }

  return verticeMenor;
}

rutas(verticesD: string[], verticesAux: string[], destino: string, origen: string): void {
  const verticeDestino = this.obtenerVertice(destino);
  const indice = this.Lstvertices.indexOf(verticeDestino!);

  if (verticesAux[indice] === null) {
      console.log(`No hay camino entre: ${origen} y ${destino}`);
      return;
  }

  let aux = destino;
  while (aux !== origen) {
      const verticeDestino = this.obtenerVertice(aux);
      const indice = this.Lstvertices.indexOf(verticeDestino!);
      verticesD.unshift(aux);
      aux = verticesAux[indice];
  }

  verticesD.unshift(aux);
}




  }//end of the class Graph









