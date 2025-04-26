// Zone1.jsx
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
      fixedTreePositions.some((tree) => tree.x === x && tree.y === y) ||
      animalPositions.some((animal) => animal.x === x && animal.y === y) ||
      houses.some(
        (house) =>
          x >= house.x && x <= house.x + 1 && y >= house.y && y <= house.y + 1
      )
    );
  };

  const getObjectsAtPointerPosition = (x, y) => {
    const treesAtPosition = fixedTreePositions.filter((tree) => tree.x === x && tree.y === y);
    const animalsAtPosition = animalPositions.filter(
      (animal) => animal.x === x && animal.y === y
    );
    const itemsAtPosition = itemPositions.filter(item => item.x === x && item.y === y);

    const objects = [];
    if (treesAtPosition.length > 0) objects.push('Trees: ' + treesAtPosition.length);
    if (animalsAtPosition.length > 0) objects.push('Animals: ' + animalsAtPosition.length);
    if (itemsAtPosition.length > 0) objects.push(`Items: ${itemsAtPosition.map(item => item.id).join(', ')}`);

    return objects.length > 0 ? objects.join(', ') : 'Nothing here.';
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
    // Generate fertile tiles
    const newFertileTiles = [];
    for (let x = 0; x < mapWidth; x++) {
      for (let y = 0; y < mapHeight; y++) {
        if (Math.random() < 0.9) {
          newFertileTiles.push({ x, y });
        }
      }
    }
    setFertileTiles(newFertileTiles);

    // Generate houses
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
      setFixedTreePositions((prevTrees) => {
        return prevTrees.map((tree) => {
          const newEnergy = Math.min(tree.energy + 1, 150);
          return { ...tree, energy: newEnergy };
        });
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load animals based on the current zone
    setAnimalPositions(getInitialAnimalPositions(currentZone));
  }, [currentZone]);

  // ----- Pointer Position Calculation -----
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
  }, [animalPositions]);

  // ----- Player Information -----
  const playerName = 'AX';
  const playerLevel = 1;

  const handleOkPress = () => {
    const itemToPickUp = itemPositions.find(item => item.x === pointerPos.x && item.y === pointerPos.y);

    if (itemToPickUp) {
      // Find the full item data from allItems
      const fullItemData = allItems.find(item => item.id === itemToPickUp.id);

      if (fullItemData) {
        // Add the full item data to the inventory
        setInventory(prevInventory => [...prevInventory, fullItemData]);

        // Remove the item from the map
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
      const objectsAtPointerPosition = getObjectsAtPointerPosition(pointerPos.x, pointerPos.y);
      enviarMensaje({
        texto: `The pointer is at position (${pointerPos.x}, ${pointerPos.y}) and there are: ${objectsAtPointerPosition}`,
        tipo: 'info',
        icono: 'ℹ️'
      });
    }
  };
  // ----- Items Logic -----
  useEffect(() => {
    // Define los objetos para cada zona usando los datos importados
    setItemPositions(itemPositionsData[currentZone] || []);
  }, [currentZone]);

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
