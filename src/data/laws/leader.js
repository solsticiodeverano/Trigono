// leader.js
import { NPCTypes } from '../../components/NPC/NPCpositions';

// Líderes por defecto por zona (puedes usar id, nombre, o tipo de NPC)
const defaultLeaders = {
  Aries: { type: NPCTypes.EMPERATRIZ, id: 5, name: 'Emperatriz' }, // Ejemplo: ninja id 5
  Tauro: { type: NPCTypes.MAIN_CEO, id: 18, name: 'CEO Supremo' },
  Géminis: { type: NPCTypes.MERCENARY, id: 23, name: 'Mercenario Alfa' },
  Cáncer: { type: NPCTypes.TRAIDOR, id: 39, name: 'Gran Pitonisa' },
  Leo: { type: NPCTypes.KING, id: 53, name: 'Rey León' },
  Virgo: { type: NPCTypes.PRIME_MINISTER, id: 56, name: 'Primer Ministra' },
  Libra: { type: NPCTypes.DRAGON_CO, id: 61, name: 'Director Dragon Co.' },
  Escorpio: { type: NPCTypes.SUPREME_MONK, id: 68, name: 'Sumo Sacerdote' },
  Sagitario: { type: NPCTypes.CYCLOPE, id: 77, name: 'Centauro Líder' },
  Capricornio: { type: NPCTypes.ELF_PRINCE, id: 78, name: 'Jefe Elfo' },
  Acuario: { type: NPCTypes.DEVA, id: 87, name: 'Gran Deva' },
  Piscis: { type: NPCTypes.CORAL_WITCH, id: 28, name: 'Reina Sirena' },
};

// Estado actual de líderes (por defecto igual a los iniciales)
let currentLeaders = { ...defaultLeaders };

/**
 * Obtiene el líder actual de una zona.
 * @param {string} zone - Nombre de la zona.
 * @returns {object} - Objeto líder (puede tener type, id, name, o playerId si es jugador).
 */
export function getLeader(zone) {
  return currentLeaders[zone];
}

/**
 * Cambia el líder de una zona.
 * @param {string} zone - Nombre de la zona.
 * @param {object} newLeader - Nuevo líder (puede ser NPC {type, id, name} o jugador {playerId, name}).
 */
export function setLeader(zone, newLeader) {
  currentLeaders[zone] = newLeader;
}

/**
 * Restaura el líder por defecto de una zona.
 * @param {string} zone - Nombre de la zona.
 */
export function resetLeader(zone) {
  currentLeaders[zone] = defaultLeaders[zone];
}

/**
 * Devuelve todos los líderes actuales.
 * @returns {object} - Diccionario zona: líder
 */
export function getAllLeaders() {
  return { ...currentLeaders };
}

/**
 * (Opcional) Devuelve todos los líderes por defecto.
 */
export function getDefaultLeaders() {
  return { ...defaultLeaders };
}
