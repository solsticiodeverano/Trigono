// Constants/saltar.js

import { aplicarGravedad } from './gravedad';  // Importa la función de gravedad
import { MUNDO, DIMENSIONES, obtenerTipoPorDefecto } from './mundo';

// Configuración predeterminada para el salto
const SALTO_ALTURA = 1;  // Altura de salto por defecto: 1 casillero en el eje Z
const TIEMPO_SALTO = 1000;  // Duración del salto: 1 segundo (1000 ms)

// Función para hacer saltar a un objeto (personaje o cualquier otro objeto)
export const saltar = (objeto) => {
  let { z } = objeto;  // La posición actual en Z del objeto

  // Aumentar la posición en Z por la altura de salto
  objeto.z += SALTO_ALTURA;

  // Usar setTimeout para esperar el tiempo de salto y luego aplicar la gravedad
  setTimeout(() => {
    // Después de 1 segundo, aplicar la gravedad al objeto para que caiga
    aplicarGravedad(objeto);
  }, TIEMPO_SALTO);

  return objeto;
};

// Evento para detectar cuando se presiona la barra espaciadora (para saltar)
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {  // Verifica si la tecla presionada es la barra espaciadora
    const objeto = obtenerObjetoSeleccionado();  // Función para obtener el objeto seleccionado (por ejemplo, el personaje)

    // Ejecutar el salto
    saltar(objeto);
  }
});

// Función que simula la obtención del objeto seleccionado (aquí puedes reemplazarla con tu lógica)
const obtenerObjetoSeleccionado = () => {
  return {
    x: 0,  // Ejemplo de coordenada X
    y: 0,  // Ejemplo de coordenada Y
    z: 0,  // Ejemplo de coordenada Z (el valor inicial puede ser 0, representando el suelo)
  };
};
