// Constants/puntero.js

// Dirección inicial del personaje (por defecto apunta hacia abajo)
export const direccionInicial = { x: 0, y: -1 };

// Función que actualiza la dirección del personaje según el movimiento
export const actualizarDireccion = (direccionActual, movimiento) => {
  // Comprobamos la dirección del movimiento y actualizamos el puntero
  switch (movimiento) {
    case 'arriba':
      // Si el personaje se mueve hacia arriba, apuntará hacia `y(+1)`
      return { x: 0, y: 1 };
    case 'abajo':
      // Si el personaje se mueve hacia abajo, apuntará hacia `y(-1)`
      return { x: 0, y: -1 };
    case 'derecha':
      // Si el personaje se mueve hacia la derecha, apuntará hacia `x(+1)`
      return { x: 1, y: 0 };
    case 'izquierda':
      // Si el personaje se mueve hacia la izquierda, apuntará hacia `x(-1)`
      return { x: -1, y: 0 };
    default:
      return direccionActual; // Si no hay movimiento, mantiene la dirección actual
  }
};
