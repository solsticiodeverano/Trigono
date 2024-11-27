// Constants/fuego.js

import { mundo } from './mundo';  // Suponiendo que tienes la estructura del mundo en 'mundo.js'
import { direccionInicial } from './puntero';  // Importamos la dirección inicial del puntero

// Datos del fuego
const FUEGO_VALOR = 10;  // Valor del fuego (daño)
const FUEGO_TIEMPO = 1000;  // Duración del fuego en milisegundos (1 segundo)

// Función que activa el fuego en el casillero al que apunta el personaje
export const activarFuego = (x, y, z, direccion) => {
  // Calculamos la posición del casillero al que está apuntando el personaje
  const casilleroAtacado = {
    x: x + direccion.x,
    y: y + direccion.y,
    z: z  // Z no cambia en este caso
  };

  // Comprobamos que la nueva posición esté dentro de los límites del mundo
  if (casilleroAtacado.x >= 0 && casilleroAtacado.x <= 89 &&
      casilleroAtacado.y >= 0 && casilleroAtacado.y <= 29 &&
      casilleroAtacado.z >= -30 && casilleroAtacado.z <= 29) {
    
    // Se establece el casillero a tipo Fuego y asignamos los valores de daño y tiempo
    mundo[casilleroAtacado.x][casilleroAtacado.y][casilleroAtacado.z] = {
      tipo: 'Fuego',
      valor: FUEGO_VALOR,  // Daño que causa el fuego
      tiempoRestante: FUEGO_TIEMPO,  // Duración del fuego (en milisegundos)
    };

    console.log(`¡Fuego activado! Casillero en x: ${casilleroAtacado.x}, y: ${casilleroAtacado.y}, z: ${casilleroAtacado.z} ahora es Fuego con ${FUEGO_VALOR} de daño y duración de ${FUEGO_TIEMPO / 1000} segundo.`);
    
    // Iniciar un temporizador que destruye el fuego después de su duración
    setTimeout(() => {
      // Restablecemos el casillero después de que haya pasado el tiempo
      mundo[casilleroAtacado.x][casilleroAtacado.y][casilleroAtacado.z] = 'Aire';  // Cambiar a 'Aire' por defecto
      console.log(`El fuego en x: ${casilleroAtacado.x}, y: ${casilleroAtacado.y}, z: ${casilleroAtacado.z} ha desaparecido.`);
    }, FUEGO_TIEMPO);
  } else {
    console.log('El casillero está fuera de los límites del mundo.');
  }
};

// Detectar la tecla 'X' y activar el ataque
document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyX') {  // Si la tecla presionada es 'X'
    const personaje = obtenerObjetoSeleccionado();  // Obtener el personaje u objeto seleccionado
    const { x, y, z } = personaje;  // Coordenadas del personaje
    const direccion = direccionInicial;  // Obtener la dirección en la que está apuntando el personaje

    // Llamar a la función activarFuego para atacar el casillero al que está apuntando el personaje
    activarFuego(x, y, z, direccion);
  }
});

// Función para simular obtener el objeto seleccionado (esto puede ser modificado con tu lógica)
const obtenerObjetoSeleccionado = () => {
  return {
    x: 5,  // Coordenada X del personaje
    y: 5,  // Coordenada Y del personaje
    z: 0,  // Coordenada Z del personaje (en el suelo)
  };
};
