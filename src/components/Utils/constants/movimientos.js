// Constants/movimientos.js

import { obtenerPosición, actualizarPosición } from './posición';
import { estaHabilitado } from './aire';

/**
 * Calcula una nueva posición basada en la dirección del movimiento.
 * @param {Object} dirección - Dirección del movimiento { dx, dy }.
 */
export const moverConTeclado = (dirección) => {
  const posiciónActual = obtenerPosición();
  const nuevaPosición = {
    x: posiciónActual.x + dirección.dx,
    y: posiciónActual.y + dirección.dy,
    z: posiciónActual.z, // Z permanece igual para movimiento 2D
  };

  // Verificar si el nuevo casillero está habilitado
  if (estaHabilitado(nuevaPosición.x, nuevaPosición.y, nuevaPosición.z)) {
    actualizarPosición(nuevaPosición);
  } else {
    console.log(`Movimiento inválido: el casillero en x:${nuevaPosición.x}, y:${nuevaPosición.y}, z:${nuevaPosición.z} no está habilitado.`);
  }
};

// Eventos de teclado
window.addEventListener('keydown', (e) => {
  const movimientos = {
    ArrowUp: { dx: 0, dy: -1 },
    ArrowDown: { dx: 0, dy: 1 },
    ArrowLeft: { dx: -1, dy: 0 },
    ArrowRight: { dx: 1, dy: 0 },
  };

  if (movimientos[e.key]) {
    moverConTeclado(movimientos[e.key]);
  }
});
