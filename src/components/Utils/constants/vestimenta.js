// Constants/vestimenta.js

// Opciones de vestimenta
const VESTIMENTA_POR_DEFECTO = {
    sombrero: null,
    lentes: null,
    capa: null,
    superior: 'Remera',
    inferior: 'Pantalon',
    abrigo: null,
    calzado: 'Zapatillas',
    medias: null,
    guantes: null,
    accesorios: null,
    maquillaje: null,
    ropaInterior: 'Ropa interior',
  };
  
  /**
   * Clase Vestimenta para gestionar la ropa y accesorios de un personaje.
   */
  class Vestimenta {
    constructor({
      sombrero = VESTIMENTA_POR_DEFECTO.sombrero,
      lentes = VESTIMENTA_POR_DEFECTO.lentes,
      capa = VESTIMENTA_POR_DEFECTO.capa,
      superior = VESTIMENTA_POR_DEFECTO.superior,
      inferior = VESTIMENTA_POR_DEFECTO.inferior,
      abrigo = VESTIMENTA_POR_DEFECTO.abrigo,
      calzado = VESTIMENTA_POR_DEFECTO.calzado,
      medias = VESTIMENTA_POR_DEFECTO.medias,
      guantes = VESTIMENTA_POR_DEFECTO.guantes,
      accesorios = VESTIMENTA_POR_DEFECTO.accesorios,
      maquillaje = VESTIMENTA_POR_DEFECTO.maquillaje,
      ropaInterior = VESTIMENTA_POR_DEFECTO.ropaInterior,
    } = {}) {
      this.sombrero = sombrero;
      this.lentes = lentes;
      this.capa = capa;
      this.superior = superior;
      this.inferior = inferior;
      this.abrigo = abrigo;
      this.calzado = calzado;
      this.medias = medias;
      this.guantes = guantes;
      this.accesorios = accesorios;
      this.maquillaje = maquillaje;
      this.ropaInterior = ropaInterior;
    }
  
    describirVestimenta() {
      return `
        Vestimenta:
        - Sombrero: ${this.sombrero || 'Ninguno'}
        - Lentes: ${this.lentes || 'Ninguno'}
        - Capa: ${this.capa || 'Ninguna'}
        - Superior: ${this.superior}
        - Inferior: ${this.inferior}
        - Abrigo: ${this.abrigo || 'Ninguno'}
        - Calzado: ${this.calzado}
        - Medias: ${this.medias || 'Ningunas'}
        - Guantes: ${this.guantes || 'Ningunos'}
        - Accesorios: ${this.accesorios || 'Ningunos'}
        - Maquillaje: ${this.maquillaje || 'Ninguno'}
        - Ropa Interior: ${this.ropaInterior}
      `;
    }
  }
  
  export default Vestimenta;
  