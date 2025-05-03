// knowledge.js

// Estado interno (en memoria) de conocimientos descubiertos
const knownConcepts = {};

/**
 * Marca un concepto como conocido.
 * @param {string} id - El id del concepto.
 */
export function discover(id) {
  knownConcepts[id] = true;
}

/**
 * Consulta si un concepto es conocido.
 * @param {string} id - El id del concepto.
 * @returns {boolean} true si se conoce, false si no.
 */
export function isKnown(id) {
  return !!knownConcepts[id];
}

/**
 * Permite resetear todos los conocimientos (para debug o reinicio de partida).
 */
export function resetKnowledge() {
  for (const key in knownConcepts) {
    delete knownConcepts[key];
  }
}

/**
 * (Opcional) Devuelve todos los ids conocidos actualmente.
 * @returns {string[]} Array de ids conocidos.
 */
export function getAllKnown() {
  return Object.keys(knownConcepts).filter(id => knownConcepts[id]);
}
