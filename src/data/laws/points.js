// points.jsx

// Estructura interna: { [playerId]: { name, total, zonas: { [zona]: puntos } } }
const playerPoints = {};

/**
 * Suma puntos a un jugador en una zona.
 * @param {string} playerId
 * @param {string} playerName
 * @param {string} zona
 * @param {number} puntos
 */
export function addPoints(playerId, playerName, zona, puntos) {
  if (!playerPoints[playerId]) {
    playerPoints[playerId] = { name: playerName, total: 0, zonas: {} };
  }
  playerPoints[playerId].zonas[zona] = (playerPoints[playerId].zonas[zona] || 0) + puntos;
  playerPoints[playerId].total += puntos;
}

/**
 * Devuelve el puntaje de un jugador en una zona.
 * @param {string} playerId
 * @param {string} zona
 * @returns {number}
 */
export function getPointsByZone(playerId, zona) {
  return playerPoints[playerId]?.zonas[zona] || 0;
}

/**
 * Devuelve el puntaje total de un jugador.
 * @param {string} playerId
 * @returns {number}
 */
export function getTotalPoints(playerId) {
  return playerPoints[playerId]?.total || 0;
}

/**
 * Devuelve el ranking global (ordenado de mayor a menor puntaje total).
 * @returns {Array} [{ playerId, name, total }]
 */
export function getGlobalRanking() {
  return Object.entries(playerPoints)
    .map(([playerId, data]) => ({ playerId, name: data.name, total: data.total }))
    .sort((a, b) => b.total - a.total);
}

/**
 * Devuelve el ranking por zona (ordenado de mayor a menor puntaje en esa zona).
 * @param {string} zona
 * @returns {Array} [{ playerId, name, puntos }]
 */
export function getRankingByZone(zona) {
  return Object.entries(playerPoints)
    .map(([playerId, data]) => ({
      playerId,
      name: data.name,
      puntos: data.zonas[zona] || 0
    }))
    .sort((a, b) => b.puntos - a.puntos);
}
