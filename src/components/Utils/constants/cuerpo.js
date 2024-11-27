// Constants/cuerpo.js

// Valores predeterminados
const TAMANIOS_CUERPO = ['S', 'M', 'L'];
const GENEROS = ['Masculino', 'Femenino', 'No Binario'];
const COLORES_PIEL = ['Claro', 'Beige', 'Moreno', 'Oscuro', 'Ébano', 'Albino'];
const COLORES_OJOS = ['Azul', 'Verde', 'Marrón', 'Negro', 'Gris', 'Ámbar', 'Avellana', 'Violeta', 'Rojo', 'Dorado', 'Turquesa', 'Plateado'];
const COLORES_CABELLO = ['Negro', 'Marrón Oscuro', 'Marrón Claro', 'Rubio', 'Rojo', 'Gris', 'Blanco', 'Verde', 'Azul', 'Rosa', 'Púrpura', 'Plateado'];

/**
 * Clase Cuerpo para representar las características físicas de un personaje.
 */
class Cuerpo {
  constructor({
    tamaño = 'M',
    género = 'No Binario',
    colorPiel = 'Claro',
    colorOjos = 'Marrón',
    cabello = 'Corto',
    colorCabello = 'Negro',
    cicatrices = false,
    vestimenta = {},
  } = {}) {
    this.tamaño = TAMANIOS_CUERPO.includes(tamaño) ? tamaño : 'M';
    this.género = GENEROS.includes(género) ? género : 'No Binario';
    this.colorPiel = COLORES_PIEL.includes(colorPiel) ? colorPiel : 'Claro';
    this.colorOjos = COLORES_OJOS.includes(colorOjos) ? colorOjos : 'Marrón';
    this.cabello = cabello; // Ej.: 'Corto', 'Largo', 'Trenzado'
    this.colorCabello = COLORES_CABELLO.includes(colorCabello) ? colorCabello : 'Negro';
    this.cicatrices = cicatrices; // Booleano
    this.vestimenta = vestimenta; // Objeto de vestimenta que viene de vestimenta.js
  }

  describirCuerpo() {
    return `
      Tamaño: ${this.tamaño}, Género: ${this.género}, 
      Color de Piel: ${this.colorPiel}, Color de Ojos: ${this.colorOjos}, 
      Cabello: ${this.cabello} (${this.colorCabello}), Cicatrices: ${this.cicatrices ? 'Sí' : 'No'}
    `;
  }
}

export default Cuerpo;
