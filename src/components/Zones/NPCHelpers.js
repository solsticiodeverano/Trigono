import {
  initialNPCPositionsAries,
  initialNPCPositionsTauro,
  initialNPCPositionsGeminis,
  initialNPCPositionsCancer,
  initialNPCPositionsLeo,
  initialNPCPositionsVirgo,
  initialNPCPositionsLibra,
  initialNPCPositionsEscorpio,
  initialNPCPositionsSagitario,
  initialNPCPositionsCapricornio,
  initialNPCPositionsAcuario,
  initialNPCPositionsPiscis,
} from '../NPC/NPCpositions';

import { mapWidth, mapHeight } from './Tile'; // Importa dimensiones del mapa

// Movimiento aleatorio de NPCs dentro de los límites del mapa
export const moveNPC = (NPCPositions, isPositionBlocked) => {
  return NPCPositions.map(NPC => {
    const direction = Math.random() < 0.5 ? 'x' : 'y';
    const step = Math.random() < 0.5 ? 1 : -1;
    const newX = direction === 'x' ? NPC.x + step : NPC.x;
    const newY = direction === 'y' ? NPC.y + step : NPC.y;

    const boundedX = Math.max(0, Math.min(newX, mapWidth - 1));
    const boundedY = Math.max(0, Math.min(newY, mapHeight - 1));

    if (!isPositionBlocked(boundedX, boundedY)) {
      return { ...NPC, x: boundedX, y: boundedY };
    }
    return NPC;
  });
};

// Devuelve los NPC iniciales según la zona (signo zodiacal)
export const getInitialNPCPositions = (zone) => {
  switch (zone) {
    case 'Aries': return initialNPCPositionsAries;
    case 'Tauro': return initialNPCPositionsTauro;
    case 'Geminis': return initialNPCPositionsGeminis;
    case 'Cancer': return initialNPCPositionsCancer;
    case 'Leo': return initialNPCPositionsLeo;
    case 'Virgo': return initialNPCPositionsVirgo;
    case 'Libra': return initialNPCPositionsLibra;
    case 'Escorpio': return initialNPCPositionsEscorpio;
    case 'Sagitario': return initialNPCPositionsSagitario;
    case 'Capricornio': return initialNPCPositionsCapricornio;
    case 'Acuario': return initialNPCPositionsAcuario;
    case 'Piscis': return initialNPCPositionsPiscis;
    default: return [];
  }
};
