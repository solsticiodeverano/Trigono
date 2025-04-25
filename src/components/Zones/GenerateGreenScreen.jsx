// generateGreenScreen.js
import { getBackgroundColor } from './ZoneHelpers';

const generateGreenScreen = ({ playerPos, screenWidth, screenHeight, fixedTreePositions, animalPositions, pointerPos, tileSize, currentZone }) => {
  const startX = Math.max(0, playerPos.x - Math.floor(screenWidth / 2));
  const startY = Math.max(0, playerPos.y - Math.floor(screenHeight / 2));
  const backgroundColor = getBackgroundColor(currentZone);
  
  const screenTiles = [];
  
  for (let y = 0; y < screenHeight; y++) {
    const row = [];
    
    for (let x = 0; x < screenWidth; x++) {
      const mapX = startX + x;
      const mapY = startY + y;
      
      const isTree = fixedTreePositions.some(tree => tree.x === mapX && tree.y === mapY);
      const isTileSelected = pointerPos.x === mapX && pointerPos.y === mapY; 
      
      row.push(
        <div
          key={`${mapX}-${mapY}`}
          className={`tile ${isTileSelected ? 'selected-tile' : ''}`}
          style={{
            backgroundColor: isTree ? 'darkgreen' : backgroundColor,
            border: isTileSelected ? '2px solid lightblue' : '1px solid black',
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
                width: `${tileSize}px`,
                height: `${tileSize}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div>hola</div>
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

export default generateGreenScreen;
