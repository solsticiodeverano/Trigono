/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from 'react';
import './Server.css';
import Display from '../Visor/Display.jsx';

//TILES imports
import {
  mapWidth,
  mapHeight,
  tileSize,
  screenWidth,
  screenHeight,
} from './Tile.jsx';

//GAME imports
import { loadGameData } from '../../loaders/LoadGameData.js';
import zodiacZones from './ZoneData.js';
import Logica from '../Gameplay/Logica.jsx';
import GenerateGreenScreen from './GenerateGreenScreen.jsx';

//PLAYER imports
import Avatar from '../Player/Avatar.jsx';
import PlayerController from './PlayerController.jsx';

//QUEST imports
import QuestLog from '../Gameplay/QuestLog.jsx';

//DISPLAYERS imports
import Consola from '../Visor/Consola.jsx';
import BookScreen from '../Gameplay/BookScreen.jsx';

//FLORA imports
import { generateTreeMaze } from './generateTreeMaze.js';

//FAUNA imports
import {
  getInitialAnimalPositions,
  moveAnimals,
  getTreeTypeForZone,
  generateFertileTiles,
   generateHouses,
   isTileFertile
} from './ZoneHelpers.js';

//NPC imports
import {
  getInitialNPCPositions,
  moveNPC,
} from './NPCHelpers.js';

//ITEMS imports
import itemPositionsData from './itemPositionsData.js';


//FLORA//
// Nueva función para intentar lanzar semilla
function trySeedRelease(trees, fertileTiles, width, height) {
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];
  const now = Date.now();
  const newSeeds = [];
  const updatedTrees = trees.map(tree => {
    // Solo árboles adultos, no semillas ni plantas
    if (
      tree.energy >= 150 &&
      tree.type !== 'seed' &&
      tree.type !== 'plant'
    ) {
      // Si nunca intentó o ya pasó el cooldown de 30s
      if (!tree.lastSeedAttempt || now >= tree.lastSeedAttempt + 30_000) {
        // Actualiza el último intento
        let updatedTree = { ...tree, lastSeedAttempt: now };

        // Probabilidad del 10% de soltar semilla
        if (Math.random() < 0.1) {
          // Busca un espacio libre a su alrededor
          const shuffledDirections = directions.sort(() => 0.5 - Math.random());
          for (let dir of shuffledDirections) {
            const nx = tree.x + dir.dx;
            const ny = tree.y + dir.dy;
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            const occupied = trees.some(t => t.x === nx && t.y === ny);
            if (!occupied) {
              newSeeds.push({ x: nx, y: ny, type: 'seed', energy: 5 });
              break; // Solo una semilla por intento
            }
          }
        }
        return updatedTree;
      }
    }
    return tree;
  });

  // Agrega las semillas nuevas a la lista de árboles
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

const Server = ({ setPointerPos }) => {

  ///VARIABLES///
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
  const [NPCPositions, setNPCPositions] = useState([]);
  const allItems = loadGameData() || [];
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [mensajesConsola, setMensajesConsola] = useState([]);
  const [selectedPower, setSelectedPower] = useState('Llama Sagrada');
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [itemPositions, setItemPositions] = useState([]);
  const [inventory, setInventory] = useState([]);

  // ----- DISPLAYER -----
  const enviarMensaje = ({ texto, tipo = 'info', icono = 'ℹ️' }) => {
    setMensajesConsola((prev) => [...prev, { id: Date.now(), texto, tipo, icono }]);
  };

 //LOGICA DE JUEGO//

  const isPositionBlocked = useCallback((x, y) => {
    return (
      fixedTreePositions.some((tree) => tree.x === x && tree.y === y && tree.type !== 'seed' && tree.type !== 'plant') ||
      animalPositions.some((animal) => animal.x === x && animal.y === y) ||
      NPCPositions.some((NPC) => NPC.x === x && NPC.y === y) ||
      houses.some(
        (house) =>
          x >= house.x && x <= house.x + 1 && y >= house.y && y <= house.y + 1
      )
    );
  });

  //OBJETOS//

  const getObjectsAtPointerPosition = (x, y) => {
    const treesAtPosition = fixedTreePositions.filter(tree => tree.x === x && tree.y === y && tree.type === 'tree');
    const seedsAtPosition = fixedTreePositions.filter(tree => tree.x === x && tree.y === y && tree.type === 'seed');
    const plantsAtPosition = fixedTreePositions.filter(tree => tree.x === x && tree.y === y && tree.type === 'plant');
    const NPCAtPosition = NPCPositions.filter(tree => tree.x === x && tree.y === y && tree.type === 'NPC');
    const animalsAtPosition = animalPositions.filter(
      (animal) => animal.x === x && animal.y === y
    );
    const itemsAtPosition = itemPositions.filter(item => item.x === x && item.y === y);

    const objects = [];
    if (treesAtPosition.length > 0) objects.push(`Trees: ${treesAtPosition.length}`);
    if (seedsAtPosition.length > 0) objects.push(`Seeds: ${seedsAtPosition.length}`);
    if (plantsAtPosition.length > 0) objects.push(`Plants: ${plantsAtPosition.length}`);
    if (animalsAtPosition.length > 0) objects.push(`Animals: ${animalsAtPosition.length}`);
    if (NPCAtPosition.length > 0) objects.push(`NPC: ${NPCAtPosition.length}`);
    if (itemsAtPosition.length > 0) objects.push(`Items: ${itemPositions.map(item => item.id).join(', ')}`);

    return objects.length > 0 ? objects.join(', ') : 'Nothing here.';
  };

  //ACCIONES FUNCIONES TECLADO

  const handleAttack = () => {
    let attacked = false;
    // Árboles

    const updatedTrees = fixedTreePositions.map(tree => ({ ...tree }));
  const updatedAnimals = animalPositions.map(animal => ({ ...animal }));
  const updatedNPCs = NPCPositions.map(npc => ({ ...npc }));
    // Atacar árboles/plants/semillas en la posición
  for (let i = updatedTrees.length - 1; i >= 0; i--) {
    const tree = updatedTrees[i];
    if (tree.x === pointerPos.x && tree.y === pointerPos.y) {
      tree.energy -= 50;
      attacked = true;
      if (tree.energy <= 0) {
        updatedTrees.splice(i, 1);
        enviarMensaje({ texto: 'Tree/Seed/Plant destroyed!', tipo: 'success', icono: '🔥' });
      } else {
        enviarMensaje({ texto: 'Attacked Tree/Seed/Plant!', tipo: 'info', icono: '⚔️' });
      }
    }
  }

  // Atacar animales en la posición
  for (let i = updatedAnimals.length - 1; i >= 0; i--) {
    const animal = updatedAnimals[i];
    if (animal.x === pointerPos.x && animal.y === pointerPos.y) {
      animal.energy -= 50;
      attacked = true;
      if (animal.energy <= 0) {
        updatedAnimals.splice(i, 1);
        enviarMensaje({ texto: 'Animal defeated!', tipo: 'success', icono: '🦊' });
      } else {
        enviarMensaje({ texto: 'Animal hit!', tipo: 'info', icono: '⚔️' });
      }
    }
  }

  // Atacar NPCs en la posición
  for (let i = updatedNPCs.length - 1; i >= 0; i--) {
    const npc = updatedNPCs[i];
    if (npc.x === pointerPos.x && npc.y === pointerPos.y) {
      npc.energy -= 50;
      attacked = true;
      if (npc.energy <= 0) {
        updatedNPCs.splice(i, 1);
        enviarMensaje({ texto: 'NPC defeated!', tipo: 'success', icono: '🧑' });
      } else {
        enviarMensaje({ texto: 'NPC hit!', tipo: 'info', icono: '⚔️' });
      }
    }
  }

  // Actualizar estados si atacó algo
  if (attacked) {
    setFixedTreePositions(updatedTrees);
    setAnimalPositions(updatedAnimals);
    setNPCPositions(updatedNPCs);
  } else {
    enviarMensaje({ texto: 'No hay nada que atacar aquí!', tipo: 'warning', icono: '⚠️' });
  }
};

  const handleGetPress = () => {
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
      enviarMensaje({
        texto: `No item to pick up here!`,
        tipo: 'warning',
        icono: '⚠️'
      });
    }
  };
  

  const handleOkPress = () => {handleAttack}

  //DISPLAYER CONSOLA
  useEffect(() => {
    if (!currentZone) return;

    enviarMensaje({
      texto: `You have entered the ${currentZone} zone!`,
      tipo: 'info',
      icono: '📍',
    });
  }, [currentZone]);


  //TILES TERRENO FERTILIDAD
  useEffect(() => {
    const newFertileTiles = generateFertileTiles(mapWidth, mapHeight);
    setFertileTiles(newFertileTiles);

    //CASAS/////////////
    const newHouses = generateHouses(6, mapWidth, mapHeight, newFertileTiles, isTileFertile);
    setHouses(newHouses);
  }, [currentZone]);

  ///POSICIONES 
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

  useEffect(() => {
    setNPCPositions(getInitialNPCPositions(currentZone));
  }, [currentZone]);

  useEffect(() => {
    const energyInterval = setInterval(() => {
      setAnimalPositions(prev => prev.map(animal => ({
        ...animal,
        energy: Math.min(animal.energy + 2, 100)
      })));
      
      setNPCPositions(prev => prev.map(npc => ({
        ...npc,
        energy: Math.min(npc.energy + 1, 120)
      })));
    }, 5000);
  
    return () => clearInterval(energyInterval);
  }, []);

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

 // Reemplazar los useEffects de movimiento con este sistema mejorado
useEffect(() => {
  const movementInterval = setInterval(() => {
    setAnimalPositions(prev => moveAnimals(prev, isPositionBlocked));
    setNPCPositions(prev => moveNPC(prev, isPositionBlocked));
  }, 1000); // Intervalo único para todos

  return () => clearInterval(movementInterval);
}, [isPositionBlocked]);

  const playerName = 'AX';
  const playerLevel = 1;

  useEffect(() => {
    setItemPositions(itemPositionsData[currentZone] || []);
  }, [currentZone]);


  //Tirar objetos
  const handleDropItemToWorld = (item, pos) => {
    setItemPositions(prev => [
      ...prev,
      {
        ...item,
        x: pos.x,
        y: pos.y,
      }
    ]);
  };
  

  ///////////////////////////////////RETURN////////////////////////

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
  getInitialNPCPositions={getInitialNPCPositions}
  setAttackPosition={setAttackPosition}
  setDirection={setDirection}
  setPointerPos={setPointerPos}
  setPlayerPos={setPlayerPos}
  setAnimalPositions={setAnimalPositions}
  setNPCPositions={setNPCPositions}
  setShowAttack={setShowAttack}
  setCanAttack={setCanAttack}
  pointerPos={pointerPos}
  setFixedTreePositions={setFixedTreePositions}
  currentZone={currentZone}
  handleAttack={handleAttack}
  handleGetPress={handleGetPress}
  canAttack={canAttack}

/>

      <div className="game-map">
        <GenerateGreenScreen
          playerPos={playerPos}
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          fixedTreePositions={fixedTreePositions}
          animalPositions={animalPositions}
          NPCPositions={NPCPositions}
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
        onDropItemToWorld={handleDropItemToWorld}
        />

      <QuestLog inventory={inventory} />
      <BookScreen allItems={allItems} />
      <Consola mensajes={mensajesConsola} />
      <Logica enviarMensaje={enviarMensaje} />
    </div>
  );
};

export default Server;
