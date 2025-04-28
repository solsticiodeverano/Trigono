import {
    initialNPCPositionsAries,
    initialNPCPositionsPiscis
  } from '../NPC/NPCpositions';
  
// NPCHelpers.js

import { mapWidth, mapHeight } from './Tile'; // Importa las dimensiones del mapa y de las celdas

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

  export const getInitialNPCPositions = (zone) => {
    switch (zone) {
      case 'Aries': return initialNPCPositionsAries;
      case 'Piscis': return initialNPCPositionsPiscis;
      default: return [];
    }
  };

  
  