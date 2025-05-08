// Constants/agua.js


// Valores predeterminados
const VALOR_AGUA = 100; // Valor inicial del agua
const ESCUDO_DURACION = 3000; // Duración del escudo en milisegundos (3 segundos por defecto)
const ESCUDO_COOLDOWN = 5000; // Tiempo de reutilización en milisegundos (5 segundos por defecto)

// Función para manejar el cambio de estado del agua
export const manejarEstadoAgua = (casillero) => {
  if (casillero.tipo === ESTADOS_AGUA.AGUA) {
    casillero.valor -= 10; // Reducimos el valor como ejemplo de interacción con fuego
    if (casillero.valor <= 0) {
      casillero.tipo = ESTADOS_AGUA.VAPOR; // Se convierte en vapor si llega a valor 0
      casillero.valor = VALOR_AGUA; // Reiniciar el valor
      console.log('El agua se ha convertido en vapor.');
    }
  }
};

// Función para activar el escudoSimple
let escudoDisponible = true; // Variable para controlar el tiempo de reutilización

export const activarEscudoSimple = (x, y, z) => {
  if (!escudoDisponible) {
    console.log('Escudo no disponible. Espera a que se recargue.');
    return;
  }

  // Verificar si el casillero está dentro de los límites del mundo
  if (
    x >= 0 && x <= 89 &&
    y >= 0 && y <= 29 &&
    z >= -30 && z <= 29
  ) {
    // Convertimos el casillero a agua y asignamos valores iniciales
    const casillero = mundo[x][y][z];
    const tipoOriginal = casillero.tipo; // Guardamos el tipo original del casillero

    casillero.tipo = ESTADOS_AGUA.AGUA;
    casillero.valor = VALOR_AGUA;

    console.log(`Escudo activado en x: ${x}, y: ${y}, z: ${z}.`);

    // Temporizador para restaurar el tipo original del casillero
    setTimeout(() => {
      casillero.tipo = tipoOriginal;
      console.log(`El escudo en x: ${x}, y: ${y}, z: ${z} ha desaparecido.`);
    }, ESCUDO_DURACION);

    // Deshabilitar el escudo hasta que el cooldown haya pasado
    escudoDisponible = false;
    setTimeout(() => {
      escudoDisponible = true;
      console.log('El escudo está disponible nuevamente.');
    }, ESCUDO_COOLDOWN);
  } else {
    console.log('El casillero está fuera de los límites del mundo.');
  }
};

// Detectar la tecla 'Z' para activar el escudoSimple
document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyZ') {
    const personaje = obtenerObjetoSeleccionado(); // Obtener el personaje u objeto seleccionado
    const { x, y, z } = personaje; // Coordenadas del personaje

    // Llamar a la función para activar el escudoSimple
    activarEscudoSimple(x, y, z);
  }
});

// Función simulada para obtener el objeto seleccionado
const obtenerObjetoSeleccionado = () => {
  return {
    x: 5,  // Coordenada X del personaje
    y: 5,  // Coordenada Y del personaje
    z: 0,  // Coordenada Z del personaje (en el suelo)
  };
};
