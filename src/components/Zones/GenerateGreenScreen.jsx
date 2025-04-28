/* eslint-disable react/prop-types */
import React from 'react';
import { getBackgroundColor } from './ZoneHelpers';


const treeIcons = {
  pine: '🌲',       // Aries
  oak: '🌳',        // Tauro
  birch: '🌿',      // Géminis
  willow: '🍃',     // Cáncer
  maple: '🍁',      // Leo
  spruce: '🎄',     // Virgo
  cedar: '🌴',      // Libra
  redwood: '🌲',    // Escorpio (puedes cambiar)
  cypress: '🌵',    // Sagitario
  fir: '🌲',        // Capricornio
  palm: '🌴',       // Acuario
  baobab: '🌳',     // Piscis
  seed: '🌱',       // Semilla (único icono para todas las zonas)
  plant: '🌿',      // Planta (puede ser un icono genérico o por zona)
  default: '🌳'
};

// Función para aclarar un color
const lightenColor = (color, amount) => {
  let newColor = color;

  // Convertir a RGB si es un nombre de color
  if (/^[a-zA-Z]+$/.test(color)) {
    const tempDiv = document.createElement("div");
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const computedColor = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    const rgbMatch = computedColor.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (rgbMatch) {
      newColor = {
        r: parseInt(rgbMatch[1]),
        g: parseInt(rgbMatch[2]),
        b: parseInt(rgbMatch[3]),
      };
    }
  } else if (typeof color === 'string' && color.startsWith('#')) {
    // Convertir el color hexadecimal a RGB
    const hexToRgb = (hex) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const rgb = hexToRgb(color);
    if (rgb) {
      newColor = rgb;
    }
  }

  if (typeof newColor === 'object' && newColor !== null && 'r' in newColor && 'g' in newColor && 'b' in newColor) {
    const r = Math.min(255, newColor.r + amount);
    const g = Math.min(255, newColor.g + amount);
    const b = Math.min(255, newColor.b + amount);

    return `rgb(${r}, ${g}, ${b})`;
  }

  return color;
};

const GenerateGreenScreen = ({
  playerPos,
  screenWidth,
  screenHeight,
  fixedTreePositions,
  animalPositions,
  pointerPos,
  tileSize,
  currentZone,
  fertileTiles,
  houses,
  itemPositions,
  allItems, // Receive allItems as a prop
  NPCPositions, // Pass NPC positions as a prop

}) => {
  const startX = Math.max(0, playerPos.x - Math.floor(screenWidth / 2));
  const startY = Math.max(0, playerPos.y - Math.floor(screenHeight / 2));
  const baseBackgroundColor = getBackgroundColor(currentZone);
  const lightenedBackgroundColor = lightenColor(baseBackgroundColor, 30);

  const getTreeAt = (x, y) => fixedTreePositions.find(tree => tree.x === x && tree.y === y);
  const isTileFertile = (x, y) => {
    return fertileTiles ? fertileTiles.some(tile => tile.x === x && tile.y === y) : false;
  };
  const isHouse = (x, y) => houses.some(house =>
    (x >= house.x && x <= house.x + 1) &&
    (y >= house.y && y <= house.y + 1)
  );

  const screenTiles = [];

  for (let y = 0; y < screenHeight; y++) {
    const row = [];

    for (let x = 0; x < screenWidth; x++) {
      const mapX = startX + x;
      const mapY = startY + y;

      const tree = getTreeAt(mapX, mapY);
      const isSelected = pointerPos.x === mapX && pointerPos.y === mapY;
      const isAnimalHere = animalPositions.some(animal => animal.x === mapX && animal.y === mapY);
      const isNPClHere = NPCPositions.some(NPC => NPC.x === mapX && NPC.y === mapY);
      const isFertile = isTileFertile(mapX, mapY);
      const isThereHouse = isHouse(mapX, mapY);
      let tileBackgroundColor = baseBackgroundColor;

      if (isThereHouse) {
        tileBackgroundColor = 'saddlebrown';
      } else if (!isFertile) {
        tileBackgroundColor = lightenedBackgroundColor;
      }

      // Find the item at this position
      const item = itemPositions.find(item => item.x === mapX && item.y === mapY);
      const fullItemData = item ? allItems.find(loadedItem => loadedItem.id === item.id) : null;

      row.push(
        <div
          key={`${mapX}-${mapY}`}
          className={`tile ${isSelected ? 'selected-tile' : ''}`}
          style={{
            backgroundColor: tileBackgroundColor,
            border: isSelected ? '2px solid lightblue' : '1px solid black',
            width: `${tileSize}px`,
            height: `${tileSize}px`,
            position: 'relative',
          }}
        >
          {/* Player */}
          {mapX === playerPos.x && mapY === playerPos.y && (
            <div
              className="player"
              style={{
                position: 'absolute',
                width: `${tileSize}px`,
                height: `${tileSize}px`,
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              <div>🙂</div>
            </div>
          )}

          {/* Tree */}
          {tree && (
            <>
              <div className={`tree tree-${tree.type}`} style={{ fontSize: `${tileSize * 0.8}px`, textAlign: 'center', lineHeight: `${tileSize}px` }}>
                {treeIcons[tree.type] || treeIcons.default}
              </div>

              {/* Energy bar */}
              <div
                className="energy-bar-container"
                style={{
                  position: 'absolute',
                  top: '-5px',
                  left: '5%',
                  width: '90%',
                  height: '5px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="energy-bar"
                  style={{
                    width: `${(tree.energy / 150) * 100}%`,
                    height: '100%',
                    backgroundColor: tree.type === 'seed' ? 'yellowgreen' : 'green',
                  }}
                />
              </div>
            </>
          )}

          {/* Animals */}
          {animalPositions.map(animal =>
            animal.x === mapX && animal.y === mapY ? (
              <div key={animal.id} className="animal" style={{ position: 'absolute', top: 0, left: 0, fontSize: `${tileSize * 0.8}px` }}>
                {animal.emoji}
              </div>
            ) : null
          )}

           {/* NPC */}
           {NPCPositions.map(NPC =>
            NPC.x === mapX && NPC.y === mapY ? (
              <div key={NPC.id} className="NPC" style={{ position: 'absolute', top: 0, left: 0, fontSize: `${tileSize * 0.8}px` }}>
                {NPC.emoji}
              </div>
            ) : null
          )}

          {/* Items (Weapons, Shields, Books, Masks) */}
          {fullItemData && (
            <div
              key={fullItemData.id}
              className="item"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                fontSize: `${tileSize * 0.6}px`,
                textAlign: 'center',
                lineHeight: `${tileSize}px`,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {fullItemData.icon}
            </div>
          )}

        </div>
      );
    }

    screenTiles.push(
      <div key={y} className="tile-row" style={{ display: 'flex' }}>
        {row}
      </div>
    );
  }

  return <>{screenTiles}</>;
};

export default GenerateGreenScreen
