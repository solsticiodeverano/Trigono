import {
  initialDragonPositionsAries,
  initialDragonPositionsTauro,
  initialDragonPositionsGeminis,
  initialDragonPositionsCancer,
  initialDragonPositionsLeo,
  initialDragonPositionsVirgo,
  initialDragonPositionsLibra,
  initialDragonPositionsEscorpio,
  initialDragonPositionsSagitario,
  initialDragonPositionsCapricornio,
  initialDragonPositionsAcuario,
  initialDragonPositionsPiscis,
} from '../Dragons/DragonsPostions';

import { mapWidth, mapHeight } from './Tile'; // Importa dimensiones del mapa

// Movimiento aleatorio de Dragons dentro de los límites del mapa
export const moveDragon = (DragonPositions, isPositionBlocked) => {
  return DragonPositions.map(Dragon => {
    const direction = Math.random() < 0.5 ? 'x' : 'y';
    const step = Math.random() < 0.5 ? 1 : -1;
    const newX = direction === 'x' ? Dragon.x + step : Dragon.x;
    const newY = direction === 'y' ? Dragon.y + step : Dragon.y;

    const boundedX = Math.max(0, Math.min(newX, mapWidth - 1));
    const boundedY = Math.max(0, Math.min(newY, mapHeight - 1));

    if (!isPositionBlocked(boundedX, boundedY)) {
      return { ...Dragon, x: boundedX, y: boundedY };
    }
    return Dragon;
  });
};

// Devuelve los Dragon iniciales según la zona (signo zodiacal)
export const getInitialDragonPositions = (zone) => {
  switch (zone) {
    case 'Aries': return initialDragonPositionsAries;
    case 'Tauro': return initialDragonPositionsTauro;
    case 'Geminis': return initialDragonPositionsGeminis;
    case 'Cancer': return initialDragonPositionsCancer;
    case 'Leo': return initialDragonPositionsLeo;
    case 'Virgo': return initialDragonPositionsVirgo;
    case 'Libra': return initialDragonPositionsLibra;
    case 'Escorpio': return initialDragonPositionsEscorpio;
    case 'Sagitario': return initialDragonPositionsSagitario;
    case 'Capricornio': return initialDragonPositionsCapricornio;
    case 'Acuario': return initialDragonPositionsAcuario;
    case 'Piscis': return initialDragonPositionsPiscis;
    default: return [];
  }
};
