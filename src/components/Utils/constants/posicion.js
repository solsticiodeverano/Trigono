// Constants/posición.js

let posiciónActual = { x: 0, y: 0, z: 0 }; // Posición inicial

/**
 * Obtiene la posición actual del personaje.
 * @returns {Object} La posición actual { x, y, z }.
 */
export const obtenerPosición = () => {
  return { ...posiciónActual }; // Retorna una copia para evitar manipulaciones externas
};

/**
 * Actualiza la posición del personaje.
 * @param {Object} nuevaPosición - Nueva posición { x, y, z }.
 */
export const actualizarPosición = (nuevaPosición) => {
  posiciónActual = { ...nuevaPosición };
  console.log(`Posición actualizada a x:${posiciónActual.x}, y:${posiciónActual.y}, z:${posiciónActual.z}`);
};
