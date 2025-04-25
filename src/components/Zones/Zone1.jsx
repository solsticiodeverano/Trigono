/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import './Zone1.css';
import fixedTreeData from './fixedTree.json'; // Importa el archivo JSON
import Display from '../Visor/Display.jsx'; // Importa el componente Display
import { initialAnimalPositionsAries } from './AnimalPositions'; // Importa las posiciones iniciales de animales
import { mapWidth, mapHeight, tileSize, screenWidth, screenHeight } from './Tile'; // Dimensiones del mapa y de las celdas
import Avatar from '../Player/Avatar.jsx';
import QuestLog from '../Gameplay/QuestLog.jsx';
import BookScreen from '../Gameplay/BookScreen.jsx';
import { loadGameData } from "../../loaders/LoadGameData.js";
import useKeyboardControls from '../Keys/Keys.jsx'; 
import Consola from '../Visor/Consola.jsx';
import Logica from '../Gameplay/Logica.jsx';
import zodiacZones from './ZoneData.js'
import { getInitialAnimalPositions, getBackgroundColor, moveAnimals } from './ZoneHelpers.js';
import generateGreenScreen from './GenerateGreenScreen.jsx';

const Zone1 = ({ setPointerPos }) => {
  // ----- Estado y Variables Iniciales -----
  const [playerPos, setPlayerPos] = useState({ x: 11, y: 10 });
  const [currentZone, setCurrentZone] = useState('Aries');
  const [showAttack, setShowAttack] = useState(false); // Estado para mostrar el ataque
  const [attackPosition, setAttackPosition] = useState(null); // Posición del ataque
  const [canAttack, setCanAttack] = useState(true); // Estado para controlar si se puede atacar
  const fixedTreePositions = fixedTreeData; // Posiciones fijas de árboles
  const [animalPositions, setAnimalPositions] = useState(initialAnimalPositionsAries); // Estado para posiciones de animales
  const allItems = loadGameData() || []; // Asegurarse de que sea un array (vacío si no hay datos)
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [mensajesConsola, setMensajesConsola] = useState([]); // Estado para mensajes de consola

  // ----- Funciones de Lógica -----
  const enviarMensaje = (texto) => {
    console.log("Mensaje enviado:", texto); // Agrega esto para depurar
    setMensajesConsola(prev => [...prev, { id: Date.now(), texto }]);
  };

  const isPositionBlocked = (x, y) => {
    return (
      fixedTreePositions.some(tree => tree.x === x && tree.y === y) ||
      animalPositions.some(animal => animal.x === x && animal.y === y)
    );
  };

  const getObjectsAtPointerPosition = (x, y) => {
    const treesAtPosition = fixedTreePositions.filter(tree => tree.x === x && tree.y === y);
    const animalsAtPosition = animalPositions.filter(animal => animal.x === x && animal.y === y);

    const objects = [];
    if (treesAtPosition.length > 0) objects.push("Árboles: " + treesAtPosition.length);
    if (animalsAtPosition.length > 0) objects.push("Animales: " + animalsAtPosition.length);

    return objects.length > 0 ? objects.join(", ") : "Nada aquí.";
  };

  const movePlayer = (dx, dy) => {
    setPlayerPos((prevPos) => {
      let newX = prevPos.x + dx;
      let newY = prevPos.y + dy;
  
      let currentIndex = zodiacZones.indexOf(currentZone);
  
      if (newX < 0) {
        // Ir a la izquierda: zona anterior
        const prevZone = zodiacZones[(currentIndex - 1 + zodiacZones.length) % zodiacZones.length];
        setCurrentZone(prevZone);
        setAnimalPositions(getInitialAnimalPositions(prevZone));
        return { x: mapWidth - 1, y: newY };
      }
  
      if (newX >= mapWidth) {
        // Ir a la derecha: zona siguiente
        const nextZone = zodiacZones[(currentIndex + 1) % zodiacZones.length];
        setCurrentZone(nextZone);
        setAnimalPositions(getInitialAnimalPositions(nextZone));
        return { x: 0, y: newY };
      }
  
      const boundedX = Math.max(0, Math.min(newX, mapWidth - 1));
      const boundedY = Math.max(0, Math.min(newY, mapHeight - 1));
  
      if (isPositionBlocked(boundedX, boundedY)) return prevPos;
  
      return { x: boundedX, y: boundedY };
    });
  
    setAttackPosition(null);
  };

  const handleOkPress = () => {
    if (pointerPos.current) {
      const pointerPos = pointerPos.current.getPointerPos();
      const objectsAtPointerPosition = getObjectsAtPointerPosition(pointerPos.x, pointerPos.y);
      enviarMensaje(`En la posición del puntero (${pointerPos.x}, ${pointerPos.y}) hay: ${objectsAtPointerPosition}`);
    }
  };   

  // ----- Manejo de Teclado -----
  const [direction, setDirection] = useState('down'); // Dirección por defecto: hacia abajo
    
  
  // ----- Cálculo de la Posición del Puntero -----
  const getPointerPos = (playerPos, direction) => {
    switch (direction) {
      case 'up': return { x: playerPos.x, y: playerPos.y - 1 };
      case 'down': return { x: playerPos.x, y: playerPos.y + 1 };
      case 'left': return { x: playerPos.x - 1, y: playerPos.y };
      case 'right': return { x: playerPos.x + 1, y: playerPos.y };
      default: return playerPos;
    }
  };
    // Dentro del render o como variable:
    const pointerPos = getPointerPos(playerPos, direction);

  useKeyboardControls({
    onMove: (dx, dy) => {
      if (dx === 1) setDirection('right');
      else if (dx === -1) setDirection('left');
      else if (dy === 1) setDirection('down');
      else if (dy === -1) setDirection('up');
      
      movePlayer(dx, dy);
    },
    onAttack: () => {
      if (canAttack) {
        setShowAttack(true);
        setAttackPosition({ ...playerPos });
        setCanAttack(false);

        setTimeout(() => {
          setShowAttack(false);
          setCanAttack(true);
        }, 1000);
      }
    },
    onJump: () => { /* Implementar salto si es necesario */ },
    onOk: handleOkPress, // Vincula el mensaje aquí
    onBack: () => { /* Lógica de regresar si es necesario */ },
    onSkill: (skillId) => { /* Lógica de habilidad */ },
    onProtect: () => { /* Lógica para protegerse */ },
    onRun: () => { /* Lógica para correr */ }
  });

  useEffect(() => {
    const timers = animalPositions.map(animal =>
      setInterval(() => {
        setAnimalPositions((prevPositions) =>
          moveAnimals(prevPositions, isPositionBlocked)  // Usa la función importada
        );
      }, animal.speed)
    );

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [animalPositions]);

  // ----- Información del Jugador -----
  const playerName = "AX"; // Nombre del jugador
  const playerLevel = 1; // Nivel del jugador

  return (
    <div className="game-container">
      <div className="game-map">
        {generateGreenScreen({
          playerPos, 
          screenWidth, 
          screenHeight, 
          fixedTreePositions, 
          animalPositions, 
          pointerPos, // <-- PASALO ASÍ
          tileSize, 
          currentZone
        })}
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
  selectedPower={"Llama Sagrada"}
  isOpen={isDisplayOpen}
  onClose={() => setIsDisplayOpen(false)}
  onOpen={() => setIsDisplayOpen(true)}
  pointerPos={pointerPos} 
/>


      <QuestLog />
      <BookScreen allItems={allItems} /> {/* Asegurarse que `allItems` sea un array */}
      <Consola mensajes={mensajesConsola} />
      <Logica enviarMensaje={enviarMensaje} />
    </div>
  );
};

export default Zone1;
