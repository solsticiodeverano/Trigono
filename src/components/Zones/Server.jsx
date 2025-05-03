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

//Dragon imports
import {
  getInitialDragonPositions,
  moveDragon,
} from './DragonHelpers.js';

//ITEMS imports
import itemPositionsData from './itemPositionsData.js';

//LEYES
import Balance from '../../data/laws/balance.jsx';
import Cities from '../../data/laws/cities.jsx';



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
    // SOLO árboles frutados pueden soltar semillas, y solo si no superó los 4 intentos
    if (
      tree.type && tree.type.endsWith('_fruto') &&
      tree.energy >= 150 &&
      (tree.fruitCycles !== undefined && tree.fruitCycles < 4)
    ) {
      // Si nunca intentó o ya pasó el cooldown de 30s
      if (!tree.lastSeedAttempt || now >= tree.lastSeedAttempt + 30_000) {
        // Probabilidad del 10% de soltar semilla
        let seedAttempted = false;
        if (Math.random() < 0.1) {
          // Busca un espacio libre a su alrededor
          const shuffledDirections = directions.sort(() => 0.5 - Math.random());
          for (let dir of shuffledDirections) {
            const nx = tree.x + dir.dx;
            const ny = tree.y + dir.dy;
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            const occupied = trees.some(t => t.x === nx && t.y === ny);
            if (!occupied) {
              // Extrae el tipo base (sin _fruto)
              let baseType = tree.type.replace('_fruto', '');
              newSeeds.push({ x: nx, y: ny, type: 'seed', energy: 5, plantType: baseType });
              seedAttempted = true;
              break; // Solo una semilla por intento
            }
          }
        }
        // Suma un ciclo de intento, exitoso o no
        return { ...tree, lastSeedAttempt: now, fruitCycles: (tree.fruitCycles || 0) + 1 };
      }
    }
    return tree;
  });

  // Agrega las semillas nuevas a la lista de árboles
  return updatedTrees.concat(newSeeds);
}

// Nueva función para actualizar energía y evolución de semillas
function updateTreeGrowth(trees, fertileTiles) {
  return trees.map(tree => {
    // SEMILLA
    if (tree.type === 'seed') {
      const newEnergy = Math.min(tree.energy + 1, 100);
      if (newEnergy >= 100) {
        if (Math.random() < 0.01) {
          const fertile = fertileTiles.some(tile => tile.x === tree.x && tile.y === tree.y);
          if (fertile) {
            // La semilla evoluciona a planta
            // plantType debe venir de la semilla al crearla, revisa trySeedRelease
            return { ...tree, type: 'plant', energy: newEnergy, plantType: tree.plantType };
          } else {
            return null; // Muere si no está en tierra fértil
          }
        } else {
          return null; // Muere
        }
      }
      return { ...tree, energy: newEnergy };
    }

    // PLANTA
    if (tree.type === 'plant') {
      const newEnergy = Math.min(tree.energy + 1, 150);
      if (newEnergy >= 150) {
        // Se convierte en árbol adulto (tipo de árbol según plantType)
        return { ...tree, type: tree.plantType, energy: 150 };
      }
      return { ...tree, energy: newEnergy };
    }

    // ÁRBOL ADULTO (NO FLORECIDO NI FRUTADO)
    if (
      tree.type && 
      !tree.type.endsWith('_flor') && 
      !tree.type.endsWith('_fruto') &&
      tree.type !== 'seed' && 
      tree.type !== 'plant'
    ) {
      const newEnergy = Math.min(tree.energy + 1, 150);
      if (newEnergy >= 150) {
        // Se convierte en árbol florecido
        return { ...tree, type: `${tree.type}_flor`, energy: 30 };
      }
      return { ...tree, energy: newEnergy };
    }

    // ÁRBOL FLORECIDO
    if (tree.type && tree.type.endsWith('_flor')) {
      const newEnergy = Math.min(tree.energy + 1, 150);
      if (newEnergy >= 150) {
        // Se convierte en árbol frutado
        const baseType = tree.type.replace('_flor', '');
        return { ...tree, type: `${baseType}_fruto`, energy: 150, fruitCycles: 0, lastSeedAttempt: 0 };
      }
      return { ...tree, energy: newEnergy };
    }

    // ÁRBOL FRUTADO
    if (tree.type && tree.type.endsWith('_fruto')) {
      // Si no tiene contador, lo inicia
      if (tree.fruitCycles === undefined) {
        return { ...tree, energy: 150, fruitCycles: 0, lastSeedAttempt: 0 };
      }
      // Si ya puso 4 semillas, vuelve a árbol normal
      if (tree.fruitCycles >= 4) {
        const baseType = tree.type.replace('_fruto', '');
        return { ...tree, type: baseType, energy: 30, fruitCycles: undefined, lastSeedAttempt: undefined };
      }
      // Siempre mantiene energía máxima
      return { ...tree, energy: 150 };
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
  const [DragonPositions, setDragonPositions] = useState([]);
  const allItems = loadGameData() || [];
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [mensajesConsola, setMensajesConsola] = useState([]);
  const [selectedPower, setSelectedPower] = useState('Llama Sagrada');
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [itemPositions, setItemPositions] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [equippedWeapon, setEquippedWeapon] = useState(null);

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
      DragonPositions.some((Dragon) => Dragon.x === x && Dragon.y === y) ||

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
    const DragonAtPosition = DragonPositions.filter(tree => tree.x === x && tree.y === y && tree.type === 'Dragon');
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
    if (DragonAtPosition.length > 0) objects.push(`NPC: ${DragonAtPosition.length}`);
    if (itemsAtPosition.length > 0) objects.push(`Items: ${itemPositions.map(item => item.id).join(', ')}`);

    return objects.length > 0 ? objects.join(', ') : 'Nothing here.';
  };

  //ACCIONES FUNCIONES TECLADO
  const baseDamage = 50;
  const weaponMultiplier = equippedWeapon?.powerMultiplier || 1;
  const damage = Math.floor(baseDamage * weaponMultiplier);

const handleAttack = () => {
  let attacked = false;

  // Árboles
  const updatedTrees = fixedTreePositions.map(tree => ({ ...tree }));
  for (let i = updatedTrees.length - 1; i >= 0; i--) {
    const tree = updatedTrees[i];
    if (tree.x === pointerPos.x && tree.y === pointerPos.y) {
      tree.energy -= damage;
      attacked = true;
      if (tree.energy <= 0) {
        updatedTrees.splice(i, 1);
        enviarMensaje({ texto: 'Árbol destruido!', tipo: 'success', icono: '🔥' });
      } else {
        enviarMensaje({ texto: `Árbol atacado con ${damage} de daño!`, tipo: 'info', icono: '⚔️' });
      }
    }
  }
  setFixedTreePositions(updatedTrees);

  // Animales
  const updatedAnimals = animalPositions.map(animal => ({ ...animal }));
  for (let i = updatedAnimals.length - 1; i >= 0; i--) {
    const animal = updatedAnimals[i];
    if (animal.x === pointerPos.x && animal.y === pointerPos.y) {
      animal.energy -= damage;
      attacked = true;
      if (animal.energy <= 0) {
        updatedAnimals.splice(i, 1);
        enviarMensaje({ texto: 'Animal derrotado!', tipo: 'success', icono: '🦊' });
      } else {
        enviarMensaje({ texto: `Animal atacado con ${damage} de daño!`, tipo: 'info', icono: '⚔️' });
      }
    }
  }
  setAnimalPositions(updatedAnimals);

  // NPCs
  const updatedNPCs = NPCPositions.map(npc => ({ ...npc }));
  for (let i = updatedNPCs.length - 1; i >= 0; i--) {
    const npc = updatedNPCs[i];
    if (npc.x === pointerPos.x && npc.y === pointerPos.y) {
      npc.energy -= damage;
      attacked = true;
      if (npc.energy <= 0) {
        updatedNPCs.splice(i, 1);
        enviarMensaje({ texto: 'NPC derrotado!', tipo: 'success', icono: '🧑' });
      } else {
        enviarMensaje({ texto: `NPC atacado con ${damage} de daño!`, tipo: 'info', icono: '⚔️' });
      }
    }
  }
  setNPCPositions(updatedNPCs);

  if (!attacked) {
    enviarMensaje({ texto: 'No hay nada que atacar aquí!', tipo: 'warning', icono: '⚠️' });
  }

// Dragons
const updatedDragons = DragonPositions.map(dragon => ({ ...dragon }));
for (let i = updatedDragons.length - 1; i >= 0; i--) {
  const dragon = updatedDragons[i];
  if (dragon.x === pointerPos.x && dragon.y === pointerPos.y) {
    dragon.energy -= damage;
    attacked = true;
    if (dragon.energy <= 0) {
      updatedDragons.splice(i, 1);
      enviarMensaje({ texto: 'Dragon derrotado!', tipo: 'success', icono: '🧑' });
    } else {
      enviarMensaje({ texto: `Dragon atacado con ${damage} de daño!`, tipo: 'info', icono: '⚔️' });
    }
  }
}
setDragonPositions(updatedDragons);

if (!attacked) {
  enviarMensaje({ texto: 'No hay nada que atacar aquí!', tipo: 'warning', icono: '⚠️' });
}
};  


const handleGetPress = () => {
  // Buscar semilla en el mapa
  const seedAtPointer = fixedTreePositions.find(
    tree => tree.x === pointerPos.x && tree.y === pointerPos.y && tree.type === 'seed'
  );

  if (seedAtPointer) {
    // Buscar el ítem semilla correspondiente en allItems por plantType
    const seedItemData = allItems.find(
      item => item.category === 'potions' && item.plantType === seedAtPointer.plantType
    );

    if (seedItemData) {
      setInventory(prev => [
        ...prev,
        {
          ...seedItemData,
          instanceId: Date.now() + Math.random(), // único para cada semilla
        }
      ]);
      // Quitar la semilla del mapa
      setFixedTreePositions(prev => prev.filter(
        tree => !(tree.x === pointerPos.x && tree.y === pointerPos.y && tree.type === 'seed')
      ));
      enviarMensaje({ texto: `Recogiste ${seedItemData.name}!`, tipo: 'success', icono: '🌱' });
    } else {
      enviarMensaje({ texto: 'No se encontró info de la semilla.', tipo: 'error', icono: '⚠️' });
    }
    return;
  }

  // Aquí sigue la lógica para otros ítems normales
  const itemToPickUp = itemPositions.find(item => item.x === pointerPos.x && item.y === pointerPos.y);

  if (itemToPickUp) {
    const fullItemData = allItems.find(item => item.id === itemToPickUp.id);

    if (fullItemData) {
      setInventory(prevInventory => [...prevInventory, fullItemData]);
      setItemPositions(prevItems => prevItems.filter(item => item.id !== itemToPickUp.id));

      enviarMensaje({
        texto: `Recogiste ${fullItemData.name} (${fullItemData.id})!`,
        tipo: 'success',
        icono: '📦'
      });
    } else {
      enviarMensaje({
        texto: `No se encontró info del ítem ${itemToPickUp.id}`,
        tipo: 'error',
        icono: '⚠️'
      });
    }
  } else {
    enviarMensaje({
      texto: `No hay nada para recoger aquí!`,
      tipo: 'warning',
      icono: '⚠️'
    });
  }
};

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
        return updateTreeGrowth (updatedTrees, fertileTiles, getTreeTypeForZone(currentZone));
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
    setDragonPositions(getInitialDragonPositions(currentZone));
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

      setDragonPositions(prev => prev.map(dragon => ({
        ...dragon,
        energy: Math.min(dragon.energy + 1, 120)
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
    setDragonPositions(prev => moveDragon(prev, isPositionBlocked));

  }, 1000); // Intervalo único para todos

  return () => clearInterval(movementInterval);
}, [isPositionBlocked]);

  const playerName = 'AX';
  const playerLevel = 1;

  useEffect(() => {
    setItemPositions(itemPositionsData[currentZone] || []);
  }, [currentZone]);

  //mapa
  const [citiesState, setCitiesState] = useState(
    zodiacZones.map(zone => ({
      name: zone,
      visited: zone === currentZone,
    }))
  );

  useEffect(() => {
    setCitiesState(prevCities =>
      prevCities.map(city =>
        city.name === currentZone ? { ...city, visited: true } : city
      )
    );
  }, [currentZone]);

  const onVisitZone = (zoneName) => {
    setCurrentZone(zoneName);
  };

  

  //Tirar objetos
  const handleDropItemToWorld = (item, pos) => {
    if (item.category === 'potions' && item.plantType) {
      // Plantar la semilla en el mundo
      setFixedTreePositions(prev => [
        ...prev,
        {
          x: pos.x,
          y: pos.y,
          type: 'seed',
          energy: 5,
          plantType: item.plantType
        }
      ]);
      setInventory(prev => prev.filter(i => i.instanceId !== item.instanceId));
      enviarMensaje({ texto: `Semilla plantada en el mundo!`, tipo: 'success', icono: '🌱' });
      return;
    }
  
    // Para otros ítems normales
    setItemPositions(prev => [
      ...prev,
      {
        ...item,
        x: pos.x,
        y: pos.y,
      }
    ]);
    setInventory(prev => prev.filter(i => i.instanceId !== item.instanceId));
    enviarMensaje({ texto: `${item.name} tirado en el mundo!`, tipo: 'success', icono: '📦' });
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
  getInitialDragonPositions={getInitialDragonPositions}
  setAttackPosition={setAttackPosition}
  setDirection={setDirection}
  setPointerPos={setPointerPos}
  setPlayerPos={setPlayerPos}
  setAnimalPositions={setAnimalPositions}
  setNPCPositions={setNPCPositions}
  setDragonPositions={setDragonPositions}
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
          DragonPositions={DragonPositions}
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
        selectedWeapon={equippedWeapon}
        onEquipWeapon={setEquippedWeapon}
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
      <Balance 
  currentZone={currentZone}
  fixedTreePositions={fixedTreePositions}

/>
<Cities
 currentZone={currentZone}
 citiesState={citiesState}
 onVisitZone={onVisitZone}
/>

    </div>
  );
};

export default Server;
