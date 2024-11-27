import { useState, useEffect } from 'react';
import './Zone1.css';
import fixedTreeData from './fixedTree.json'; // Importa el archivo JSON
import Display from './Display'; // Importa el componente Display
import { initialAnimalPositions } from './AnimalPositions'; // Importa las posiciones iniciales de animales
import { mapWidth, mapHeight, tileSize, screenWidth, screenHeight } from './Tile'; // Dimensiones del mapa y de las celdas

const Zone1 = () => {
  // Estado para la posición del jugador
  const [playerPos, setPlayerPos] = useState({ x: 11, y: 10 });
  const [showAttack, setShowAttack] = useState(false); // Estado para mostrar el ataque
  const [attackPosition, setAttackPosition] = useState(null); // Posición del ataque
  const [canAttack, setCanAttack] = useState(true); // Estado para controlar si se puede atacar
  const fixedTreePositions = fixedTreeData; // Posiciones fijas de árboles
  const [animalPositions, setAnimalPositions] = useState(initialAnimalPositions); // Estado para posiciones de animales

  // Función para verificar si una posición está bloqueada
  const isPositionBlocked = (x, y) => {
    return (
      fixedTreePositions.some(tree => tree.x === x && tree.y === y) ||
      animalPositions.some(animal => animal.x === x && animal.y === y)
    );
  };

  // Mover al jugador con verificaciones
  const movePlayer = (dx, dy) => {
    setPlayerPos((prevPos) => {
      const newX = prevPos.x + dx;
      const newY = prevPos.y + dy;

      const boundedX = Math.max(0, Math.min(newX, mapWidth - 1));
      const boundedY = Math.max(0, Math.min(newY, mapHeight - 1));

      if (isPositionBlocked(boundedX, boundedY)) {
        console.log("Movimiento bloqueado en posición:", { x: boundedX, y: boundedY });
        return prevPos;
      }

      console.log("Movimiento permitido a posición:", { x: boundedX, y: boundedY });
      return { x: boundedX, y: boundedY };
    });

    setAttackPosition(null); // Restablecer la posición de ataque al moverse
  };

  // Manejar teclas de movimiento y ataque
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        movePlayer(0, -1);
        break;
      case 'ArrowDown':
        movePlayer(0, 1);
        break;
      case 'ArrowLeft':
        movePlayer(-1, 0);
        break;
      case 'ArrowRight':
        movePlayer(1, 0);
        break;
      case 'x': // Ataque
        if (canAttack) {
          setShowAttack(true);
          setAttackPosition({ ...playerPos });
          setCanAttack(false);

          setTimeout(() => {
            setShowAttack(false);
            setCanAttack(true);
          }, 1000);
        }
        break;
      default:
        break;
    }
  };

  // Mover a los animales de manera aleatoria
  const moveAnimals = () => {
    setAnimalPositions((prevPositions) =>
      prevPositions.map(animal => {
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
      })
    );
  };

  // Listeners de teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Intervalos para mover animales
  useEffect(() => {
    const timers = animalPositions.map(animal =>
      setInterval(() => moveAnimals(), animal.speed)
    );

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [animalPositions]);

  // Generar tiles del mapa
  const generateScreen = () => {
    const screenTiles = [];
    const startX = Math.max(0, playerPos.x - Math.floor(screenWidth / 2));
    const startY = Math.max(0, playerPos.y - Math.floor(screenHeight / 2));

    for (let y = 0; y < screenHeight; y++) {
      const row = [];
      for (let x = 0; x < screenWidth; x++) {
        const mapX = startX + x;
        const mapY = startY + y;

        const isTree = fixedTreePositions.some(tree => tree.x === mapX && tree.y === mapY);

        row.push(
          <div
            key={`${mapX}-${mapY}`}
            className="tile"
            style={{
              backgroundColor: isTree ? 'darkgreen' : 'green',
              border: '1px solid black',
              width: `${tileSize}px`,
              height: `${tileSize}px`,
              position: 'relative',
            }}
          >
            {mapX === playerPos.x && mapY === playerPos.y && (
              <div className="player">
                🧙‍♀️
                {showAttack && attackPosition?.x === mapX && attackPosition?.y === mapY && (
                  <div className="attack">⚡</div>
                )}
              </div>
            )}
            {isTree && <div className="tree">🌳</div>}
            {animalPositions.map(animal =>
              animal.x === mapX && animal.y === mapY && (
                <div key={animal.id} className="animal">{animal.emoji}</div>
              )
            )}
          </div>
        );
      }
      screenTiles.push(<div key={y} className="tile-row">{row}</div>);
    }
    return screenTiles;
  };

  // Información del jugador
  const playerName = "AX"; // Nombre del jugador
  const playerLevel = 1; // Nivel del jugador

  return (
    <div className="game-container">
      <Display name={playerName} level={playerLevel} position={playerPos} />
      <div className="game-map">{generateScreen()}</div>
    </div>
  );
};

export default Zone1;
