import {
    initialAnimalPositionsAries,
    initialAnimalPositionsTauro,
    initialAnimalPositionsGeminis,
    initialAnimalPositionsCancer,
    initialAnimalPositionsLeo,
    initialAnimalPositionsVirgo,
    initialAnimalPositionsLibra,
    initialAnimalPositionsEscorpio,
    initialAnimalPositionsSagitario,
    initialAnimalPositionsCapricornio,
    initialAnimalPositionsAcuario,
    initialAnimalPositionsPiscis
  } from './AnimalPositions';
  
// ZoneHelpers.js

import { mapWidth, mapHeight } from './Tile'; // Importa las dimensiones del mapa y de las celdas

export const moveAnimals = (animalPositions, isPositionBlocked) => {
  return animalPositions.map(animal => {
    const direction = Math.random() < 0.5 ? 'x' : 'y';
    const step = Math.random() < 0.5 ? 1 : -1;
    const newX = direction === 'x' ? animal.x + step : animal.x;
    const newY = direction === 'y' ? animal.y + step : animal.y;

    const boundedX = Math.max(0, Math.min(newX, mapWidth - 1));
    const boundedY = Math.max(0, Math.min(newY, mapHeight - 1));

    if (!isPositionBlocked(boundedX, boundedY)) {
      return { ...animal, x: boundedX, y: boundedY };
    }
    return animal;
  });
};

  export const getInitialAnimalPositions = (zone) => {
    switch (zone) {
      case 'Aries': return initialAnimalPositionsAries;
      case 'Tauro': return initialAnimalPositionsTauro;
      case 'Géminis': return initialAnimalPositionsGeminis;
      case 'Cáncer': return initialAnimalPositionsCancer;
      case 'Leo': return initialAnimalPositionsLeo;
      case 'Virgo': return initialAnimalPositionsVirgo;
      case 'Libra': return initialAnimalPositionsLibra;
      case 'Escorpio': return initialAnimalPositionsEscorpio;
      case 'Sagitario': return initialAnimalPositionsSagitario;
      case 'Capricornio': return initialAnimalPositionsCapricornio;
      case 'Acuario': return initialAnimalPositionsAcuario;
      case 'Piscis': return initialAnimalPositionsPiscis;
      default: return [];
    }
  };
  
  export const getBackgroundColor = (zone) => {
    const zoneColors = {
      Aries: 'orange',
      Tauro: 'brown',
      Géminis: 'green',
      Cáncer: 'lightblue',
      Leo: 'yellow',
      Virgo: 'grey',
      Libra: 'pink',
      Escorpio: 'black',
      Sagitario: 'red',
      Capricornio: 'purple',
      Acuario: 'violet',
      Piscis: 'blue',
    };
    return zoneColors[zone] || 'lightgray';
  };

  export const treeTypesByZone = {
    Aries: 'pine',
    Tauro: 'oak',
    Géminis: 'birch',
    Cáncer: 'willow',
    Leo: 'maple',
    Virgo: 'spruce',
    Libra: 'cedar',
    Escorpio: 'redwood',
    Sagitario: 'cypress',
    Capricornio: 'fir',
    Acuario: 'palm',
    Piscis: 'baobab',
  };
  
  export const getTreeTypeForZone = (zone) => treeTypesByZone[zone] || 'default';
  
  export function generateFertileTiles(mapWidth, mapHeight, probability = 0.9) {
    const fertileTiles = [];
    for (let x = 0; x < mapWidth; x++) {
      for (let y = 0; y < mapHeight; y++) {
        if (Math.random() < probability) {
          fertileTiles.push({ x, y });
        }
      }
    }
    return fertileTiles;
  }
  // ZoneHelpers.js
export const isTileFertile = (x, y, fertileTiles) => 
  fertileTiles.some(tile => tile.x === x && tile.y === y);

  export function generateHouses(numHouses, mapWidth, mapHeight, fertileTiles, isTileFertile) {
    const houses = [];
    for (let i = 0; i < numHouses; i++) {
      let houseX, houseY;
      do {
        houseX = Math.floor(Math.random() * (mapWidth - 1));
        houseY = Math.floor(Math.random() * (mapHeight - 1));
      } while (
        houses.some((house) => house.x === houseX && house.y === houseY) ||
        !isTileFertile(houseX, houseY, fertileTiles) ||
        !isTileFertile(houseX + 1, houseY, fertileTiles) ||
        !isTileFertile(houseX, houseY + 1, fertileTiles) ||
        !isTileFertile(houseX + 1, houseY + 1, fertileTiles)
      );
      houses.push({ x: houseX, y: houseY });
    }
    return houses;
  }