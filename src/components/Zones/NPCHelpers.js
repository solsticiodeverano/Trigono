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
// Función para mezclar un array (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
export const moveNPC = (NPCPositions, isPositionBlocked) => {
  const directions = [
    { dx: 1, dy: 0 },   // derecha
    { dx: -1, dy: 0 },  // izquierda
    { dx: 0, dy: 1 },   // abajo
    { dx: 0, dy: -1 },  // arriba
  ];
const shuffled = shuffleArray(directions);
console.log('Direcciones barajadas:', shuffled);

  return NPCPositions.map(NPC => {
    const shuffled = shuffleArray(directions);

    for (const { dx, dy } of shuffled) {
      const newX = Math.max(0, Math.min(NPC.x + dx, mapWidth - 1));
      const newY = Math.max(0, Math.min(NPC.y + dy, mapHeight - 1));

      if (!isPositionBlocked(newX, newY)) {
        return { ...NPC, x: newX, y: newY };
      }
    }

    // Si todas las direcciones están bloqueadas, no se mueve
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
