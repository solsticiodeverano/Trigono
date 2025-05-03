// justice.js
import { getGovernmentForZone } from './goberments.js';
import { NPCTypes } from './NPCPositions.jsx';

// Define enemigos por zona (puedes expandir esto según tu juego)
const enemyNPCTypesByZone = {
  Aries:   [NPCTypes.FAUN, NPCTypes.NINJA, NPCTypes.SAMURAI],
  Tauro:   [NPCTypes.DRIAD, NPCTypes.BUSINESSPERSON, NPCTypes.CEO],
  Géminis: [NPCTypes.FAIRY, NPCTypes.MERCENARY, NPCTypes.SMUGGLER],
  Cáncer:  [NPCTypes.SEER, NPCTypes.INFILTRATOR, NPCTypes.SAGE],
  Leo:     [NPCTypes.RESEARCHER, NPCTypes.SECURITY, NPCTypes.GENERAL],
  Virgo:   [NPCTypes.WITCH, NPCTypes.MINISTER, NPCTypes.LEADER],
  Libra:   [NPCTypes.CIRCUS, NPCTypes.DRAGON_CO, NPCTypes.TAMER],
  Escorpio:[NPCTypes.INITIATE, NPCTypes.MONK, NPCTypes.PRIEST],
  Sagitario: [NPCTypes.CENTAUR, NPCTypes.GUARDIAN, NPCTypes.LEADER],
  Capricornio: [NPCTypes.ELF, NPCTypes.MAGE, NPCTypes.HERMIT],
  Acuario: [NPCTypes.DEVA, NPCTypes.ANGEL, NPCTypes.STAR],
  Piscis:  [NPCTypes.MERMAID, NPCTypes.TRITON, NPCTypes.MEDUSA],
};

// Votos por defecto para cada zona (puedes personalizar esto según tu lógica)
const defaultVotesByZone = {
  Aries:    { Emperatriz: true },
  Tauro:    { Emperatriz: true },
  Géminis:  { Emperatriz: true },
  Cáncer:   { Cancer: true, Leo: false, Virgo: true },
  Leo:      { Cancer: true, Leo: true, Virgo: false },
  Virgo:    { Cancer: false, Leo: true, Virgo: true },
  Libra:    { Libra: true },
  Escorpio: { Escorpio: false },
  Sagitario:{ Sagitario: true },
  Capricornio: { Capricornio: true, Acuario: false, Piscis: true },
  Acuario:     { Capricornio: true, Acuario: true, Piscis: false },
  Piscis:      { Capricornio: false, Acuario: true, Piscis: true },
};

/**
 * Devuelve un array de tipos de NPC enemigos en la zona actual,
 * según la lógica de gobierno de esa zona.
 * @param {string} zone - La zona actual.
 * @param {object} [votes] - Opcional: votos para la lógica de gobierno.
 * @returns {array} - Array de tipos de NPC enemigos, o [] si no hay enemigos.
 */
export function getEnemyNPCTypesForZone(zone, votes) {
  const gov = getGovernmentForZone(zone);
  if (!gov) return [];
  // Usa los votos recibidos o los de default
  const effectiveVotes = votes || defaultVotesByZone[zone] || {};
  const decision = gov.logic(zone, effectiveVotes);

  // Si el gobierno "vota" que eres enemigo, devuelve los tipos de NPC enemigos
  if (decision) {
    return enemyNPCTypesByZone[zone] || [];
  }
  // Si no, no hay enemigos en esta zona
  return [];
}
