/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import './Zone1.css';
import fixedTreeData from './fixedTree.json';
import Display from '../Visor/Display.jsx';
import {
  mapWidth,
  mapHeight,
  tileSize,
  screenWidth,
  screenHeight,
} from './Tile';
import Avatar from '../Player/Avatar.jsx';
import QuestLog from '../Gameplay/QuestLog.jsx';
import BookScreen from '../Gameplay/BookScreen.jsx';
import { loadGameData } from '../../loaders/LoadGameData.js';
import Consola from '../Visor/Consola.jsx';
import Logica from '../Gameplay/Logica.jsx';
import zodiacZones from './ZoneData.js';
import {
  getInitialAnimalPositions,
  moveAnimals,
} from './ZoneHelpers.js';
import GenerateGreenScreen from './GenerateGreenScreen.jsx';
import { generateTreeMaze } from './generateTreeMaze.js';
import PlayerController from './PlayerController.jsx';
import itemPositionsData from './itemPositionsData';

// Nueva función para intentar lanzar semilla
function trySeedRelease(trees, fertileTiles, width, height) {
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  const newSeeds = [];
  const updatedTrees = trees.map(tree => {
    // Solo árboles que no hayan dado semilla
    if (
      tree.energy >= 150 &&
      tree.type !== 'seed' &&
      tree.type !== 'plant' &&
      !tree.hasGivenSeed // NUEVO CHEQUEO
    ) {
      if (Math.random() < 0.5) {
        const shuffledDirections = directions.sort(() => 0.5 - Math.random());
        for (let dir of shuffledDirections) {
          const nx = tree.x + dir.dx;
          const ny = tree.y + dir.dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          const occupied = trees.some(t => t.x === nx && t.y === ny);
          if (!occupied) {
            newSeeds.push({ x: nx, y: ny, type: 'seed', energy: 5 });
            // Marcar árbol como que ya dio semilla
            return { ...tree, hasGivenSeed: true, seedCooldownUntil: Date.now() + 2 * 60 * 1000 // 2 minutos en milisegundos
            };
          }
        }
      }
    }
    return tree;
  });

  // Agregar las semillas nuevas a la lista de árboles
  return updatedTrees.concat(newSeeds);
}
// Nueva función para actualizar energía y evolución de semillas
function updateSeedsAndPlants(trees, fertileTiles, treeType) {
  return trees.map(tree => {
    if (tree.type === 'seed') {
      const newEnergy = Math.min(tree.energy + 1, 100);

      if (newEnergy >= 100) {
        if (Math.random() < 0.01) {
          const fertile = fertileTiles.some(tile => tile.x === tree.x && tile.y === tree.y);
          if (fertile) {
            return { ...tree, type: 'plant', energy: newEnergy };
          } else {
            return null; // La semilla muere si no está en tierra fértil
          }
        } else {
          return null; // La semilla muere
        }
      } else {
        return { ...tree, energy: newEnergy };
      }
    } else if (tree.type === 'plant') {
      if (tree.energy >= 150) {
        return { ...tree, type: treeType, energy: 150 }; // Se convierte en árbol
      } else {
        const newEnergy = Math.min(tree.energy + 1, 150);
        return { ...tree, energy: newEnergy }; // Aumenta la energía de la planta
      }
    }
    return tree;
  }).filter(tree => tree !== null);
}

const Zone1 = ({ setPointerPos }) => {
  // ----- State and Initial Variables -----
  const [playerPos, setPlayerPos] = useState({ x: 11, y: 10 });
  const [currentZone, setCurrentZone] = useState('Aries');
  const [showAttack, setShowAttack] = useState(false);
  const [attackPosition, setAttackPosition] = useState(null);
  const [canAttack, setCanAttack] = useState(true);
  const [fixedTreePositions, setFixedTreePositions] = useState([]);
  const [fertileTiles, setFertileTiles] = useState([]);
  const [houses, setHouses] = useState([]);
  const [direction, setDirection] = useState('down');
  const [animalPositions, setAnimalPositions] = useState([]);
  const allItems = loadGameData() || [];
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [mensajesConsola, setMensajesConsola] = useState([]);
  const [selectedPower, setSelectedPower] = useState('Llama Sagrada');
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [itemPositions, setItemPositions] = useState([]);
  const [inventory, setInventory] = useState([]);

  // ----- Logic Functions -----
  const enviarMensaje = ({ texto, tipo = 'info', icono = 'ℹ️' }) => {
    setMensajesConsola((prev) => [...prev, { id: Date.now(), texto, tipo, icono }]);
  };

  const isTileFertile = (x, y, fertileTiles) => {
    return fertileTiles.some((tile) => tile.x === x && tile.y === y);
  };

  const isPositionBlocked = (x, y) => {
    return (
      fixedTreePositions.some((tree) => tree.x === x && tree.y === y && tree.type !== 'seed' && tree.type !== 'plant') ||
      animalPositions.some((animal) => animal.x === x && animal.y === y) ||
      houses.some(
        (house) =>
          x >= house.x && x <= house.x + 1 && y >= house.y && y <= house.y + 1
      )
    );
  };

  const getObjectsAtPointerPosition = (x, y) => {
    const treesAtPosition = fixedTreePositions.filter(tree => tree.x === x && tree.y === y && tree.type === 'tree');
    const seedsAtPosition = fixedTreePositions.filter(tree => tree.x === x && tree.y === y && tree.type === 'seed');
    const plantsAtPosition = fixedTreePositions.filter(tree => tree.x === x && tree.y === y && tree.type === 'plant');
    const animalsAtPosition = animalPositions.filter(
      (animal) => animal.x === x && animal.y === y
    );
    const itemsAtPosition = itemPositions.filter(item => item.x === x && item.y === y);

    const objects = [];
    if (treesAtPosition.length > 0) objects.push(`Trees: ${treesAtPosition.length}`);
    if (seedsAtPosition.length > 0) objects.push(`Seeds: ${seedsAtPosition.length}`);
    if (plantsAtPosition.length > 0) objects.push(`Plants: ${plantsAtPosition.length}`);
    if (animalsAtPosition.length > 0) objects.push(`Animals: ${animalsAtPosition.length}`);
    if (itemsAtPosition.length > 0) objects.push(`Items: ${itemPositions.map(item => item.id).join(', ')}`);

    return objects.length > 0 ? objects.join(', ') : 'Nothing here.';
  };

  const handleAttack = () => {
    const updatedTrees = fixedTreePositions.map(tree => ({ ...tree }));
    const treeIndex = updatedTrees.findIndex(tree => tree.x === pointerPos.x && tree.y === pointerPos.y);

    if (treeIndex !== -1) {
      const attackedTree = updatedTrees[treeIndex];
      attackedTree.energy -= 50;

      if (attackedTree.energy <= 0) {
        updatedTrees.splice(treeIndex, 1);
        enviarMensaje({ texto: 'Tree/Seed/Plant destroyed!', tipo: 'success', icono: '🔥' });
      } else {
        enviarMensaje({ texto: 'Attacked Tree/Seed/Plant!', tipo: 'info', icono: '⚔️' });
      }
      setFixedTreePositions(updatedTrees);
    } else {
      enviarMensaje({ texto: 'No Tree/Seed/Plant to attack!', tipo: 'warning', icono: '⚠️' });
    }
  };

  const handleOkPress = () => {
    const itemToPickUp = itemPositions.find(item => item.x === pointerPos.x && item.y === pointerPos.y);

    if (itemToPickUp) {
      const fullItemData = allItems.find(item => item.id === itemToPickUp.id);

      if (fullItemData) {
        setInventory(prevInventory => [...prevInventory, fullItemData]);
        setItemPositions(prevItems => prevItems.filter(item => item.id !== itemToPickUp.id));

        enviarMensaje({
          texto: `Picked up ${fullItemData.name} (${fullItemData.id})!`,
          tipo: 'success',
          icono: '📦'
        });
      } else {
        enviarMensaje({
          texto: `Item data not found for ${itemToPickUp.id}`,
          tipo: 'error',
          icono: '⚠️'
        });
      }
    } else {
      handleAttack();
    }
  };

  useEffect(() => {
    if (!currentZone) return;

    enviarMensaje({
      texto: `You have entered the ${currentZone} zone!`,
      tipo: 'info',
      icono: '📍',
    });
  }, [currentZone]);

  useEffect(() => {
    const newFertileTiles = [];
    for (let x = 0; x < mapWidth; x++) {
      for (let y = 0; y < mapHeight; y++) {
        if (Math.random() < 0.9) {
          newFertileTiles.push({ x, y });
        }
      }
    }
    setFertileTiles(newFertileTiles);

    const newHouses = [];
    for (let i = 0; i < 6; i++) {
      let houseX, houseY;
      do {
        houseX = Math.floor(Math.random() * (mapWidth - 1));
        houseY = Math.floor(Math.random() * (mapHeight - 1));
      } while (
        newHouses.some((house) => house.x === houseX && house.y === houseY) ||
        !isTileFertile(houseX, houseY, newFertileTiles) ||
        !isTileFertile(houseX + 1, houseY, newFertileTiles) ||
        !isTileFertile(houseX, houseY + 1, newFertileTiles) ||
        !isTileFertile(houseX + 1, houseY + 1, newFertileTiles)
      );
      newHouses.push({ x: houseX, y: houseY });
    }
    setHouses(newHouses);
  }, [currentZone]);

  useEffect(() => {
    const mazeTrees = generateTreeMaze(120, 30, currentZone, fertileTiles, houses);
    setFixedTreePositions(mazeTrees);
  }, [currentZone, fertileTiles, houses]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFixedTreePositions(prevTrees => {
        return trySeedRelease(prevTrees, fertileTiles, mapWidth, mapHeight);
      });

      setFixedTreePositions((prevTrees) => {
        const updatedTrees = prevTrees.map((tree) => {
          if (tree.type !== 'seed') {
            const newEnergy = Math.min(tree.energy + 1, 150);
            return { ...tree, energy: newEnergy };
          }
          return tree;
        });
        return updateSeedsAndPlants(updatedTrees, fertileTiles, getTreeTypeForZone(currentZone));
      });
    }, 500);

    return () => clearInterval(interval);
  }, [fertileTiles, currentZone]);

  useEffect(() => {
    setAnimalPositions(getInitialAnimalPositions(currentZone));
  }, [currentZone]);

  const getPointerPos = (playerPos, direction) => {
    switch (direction) {
      case 'up':
        return { x: playerPos.x, y: playerPos.y - 1 };
      case 'down':
        return { x: playerPos.x, y: playerPos.y + 1 };
      case 'left':
        return { x: playerPos.x - 1, y: playerPos.y };
      case 'right':
        return { x: playerPos.x + 1, y: playerPos.y };
      default:
        return playerPos;
    }
  };

  const pointerPos = getPointerPos(playerPos, direction);

  useEffect(() => {
    const timers = animalPositions.map(
      (animal) =>
        setInterval(() => {
          setAnimalPositions((prevPositions) =>
            moveAnimals(prevPositions, isPositionBlocked)
          );
        }, animal.speed)
    );

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [animalPositions, isPositionBlocked]);

  const playerName = 'AX';
  const playerLevel = 1;

  useEffect(() => {
    setItemPositions(itemPositionsData[currentZone] || []);
  }, [currentZone]);

  const getTreeTypeForZone = (zone) => {
    const treeTypesByZone = {
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

    return treeTypesByZone[zone] || 'default';
  };

  return (
    <div className="game-container">
      {/* PlayerController Component */}
      <PlayerController
        initialPosition={{ x: 11, y: 10 }}
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        isPositionBlocked={isPositionBlocked}
        setCurrentZone={setCurrentZone}
        zodiacZones={zodiacZones}
        getInitialAnimalPositions={getInitialAnimalPositions}
        setAttackPosition={setAttackPosition}
        setDirection={setDirection}
        setPointerPos={setPointerPos}
        setPlayerPos={setPlayerPos}
        setAnimalPositions={setAnimalPositions}
        setShowAttack={setShowAttack}
        setCanAttack={setCanAttack}
        pointerPos={pointerPos}
        setFixedTreePositions={setFixedTreePositions}
        currentZone={currentZone}
        handleOkPress={handleOkPress} // Pass handleOkPress
      />

      <div className="game-map">
        <GenerateGreenScreen
          playerPos={playerPos}
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          fixedTreePositions={fixedTreePositions}
          animalPositions={animalPositions}
          pointerPos={pointerPos}
          tileSize={tileSize}
          currentZone={currentZone}
          fertileTiles={fertileTiles}
          houses={houses}
          itemPositions={itemPositions}
          allItems={allItems} // Pass allItems to GenerateGreenScreen
        />
      </div>

      <Display
        name={playerName}
        level={playerLevel}
        position={playerPos}
        direction={direction}
        stats={{
          tierra: 75,
          fuego: 60,
          viento: 45,
          agua: 80,
        }}
        selectedPower={selectedPower}
        isOpen={isDisplayOpen}
        onClose={() => setIsDisplayOpen(false)}
        onOpen={() => setIsDisplayOpen(true)}
        pointerPos={pointerPos}
        inventory={inventory}
        setInventory={setInventory}
      />

      <QuestLog inventory={inventory} />
      <BookScreen allItems={allItems} />
      <Consola mensajes={mensajesConsola} />
      <Logica enviarMensaje={enviarMensaje} />
    </div>
  );
};

export default Zone1;
