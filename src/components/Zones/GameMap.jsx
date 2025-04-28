import React, { useEffect, useState } from 'react';
import { ReactComponent as StarterIcon } from './IMG/starter/starter.svg';
import './GameMap.css'; // Puedes crear un archivo CSS específico si es necesario

const GameMap = ({
  playerPos,
  setPlayerPos,
  fixedTreePositions,
  animalPositions,
  NPCPositions,
  setAnimalPositions,
  setNPCPositions
  showAttack,
  attackPosition,
  setShowAttack,
  canAttack,
  setCanAttack,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Aquí defines el tamaño del mapa y el tamaño de los tiles
  const mapWidth = 20; // Ancho del mapa en tiles
  const mapHeight = 15; // Alto del mapa en tiles
  const tileSize = 40; // Tamaño de cada tile en píxeles

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPositionBlocked = (x, y) => {
    return (
      fixedTreePositions.some(tree => tree.x === x && tree.y === y) ||
      NPCPositions.some(NPC => NPC.x === x && NPC.y === y) ||
      animalPositions.some(animal => animal.x === x && animal.y === y)
    );
  };

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
  };

  const generateScreen = () => {
    const screenTiles = [];
    const startX = Math.max(0, playerPos.x - Math.floor(screenWidth / tileSize / 2));
    const startY = Math.max(0, playerPos.y - Math.floor(screenHeight / tileSize / 2));

    for (let y = 0; y < Math.min(mapHeight, screenHeight / tileSize); y++) {
      const row = [];
      for (let x = 0; x < Math.min(mapWidth, screenWidth / tileSize); x++) {
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
           <div
           className="player"
           style={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             width: `${tileSize}px`,
             height: `${tileSize}px`,
             transform: 'translate(-50%, -50%)',
           }}
         >
           <StarterIcon
             style={{
               width: '100%',
               height: '100%',
             }}
           />
         
                {showAttack && attackPosition?.x === mapX && attackPosition?.y === mapY && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      fontSize: '40px', // Tamaño del emoticono de ataque
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    ⚡ {/* Emoticono de ataque */}
                  </div>
                )}
              </div>
            )}
            {isTree && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  fontSize: '40px',
                  color: 'green',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                🌳
              </div>
            )}
            {animalPositions.map((animal) => (
              animal.x === mapX && animal.y === mapY && (
                <div
                  key={`${animal.id}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    fontSize: '40px',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {animal.emoji}
                </div>
              )
            ))}
          </div>
        );
      }
      screenTiles.push(
        <div key={y} className="tile-row" style={{ display: 'flex' }}>
          {row}
        </div>
      );
    }
    return screenTiles;
  };

  return (
    <div className="game-map">
      {generateScreen()}
    </div>
  );
};

export default GameMap;
