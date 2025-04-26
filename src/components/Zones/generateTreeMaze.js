export function generateTreeMaze(width = 120, height = 40, zone = 'Aries', fertileTiles = [], houses = []) {
    const trees = [];
  
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
  
    const treeType = treeTypesByZone[zone] || 'default';
  
    const leftOpenings = [8, 20];
    const rightOpenings = [8, 20];
  
    const isTileFertile = (x, y, fertileTiles) => {
      return fertileTiles.some(tile => tile.x === x && tile.y === y);
    };
  
    // Función para verificar si una posición está dentro de una casa
    const isInsideHouse = (x, y, houses) => {
      return houses.some(house =>
        (x >= house.x && x <= house.x + 1) &&
        (y >= house.y && y <= house.y + 1)
      );
    };
  
    for (let x = 0; x < width; x++) {
      if (isTileFertile(x, 0, fertileTiles) && !isInsideHouse(x, 0, houses)) {
        trees.push({ x, y: 0, type: treeType, energy: Math.floor(Math.random() * 51) + 100 });
      }
      if (isTileFertile(x, height - 1, fertileTiles) && !isInsideHouse(x, height - 1, houses)) {
        trees.push({ x, y: height - 1, type: treeType, energy: Math.floor(Math.random() * 51) + 100 });
      }
    }
  
    for (let y = 1; y < height - 1; y++) {
      if (!leftOpenings.includes(y) && isTileFertile(0, y, fertileTiles) && !isInsideHouse(0, y, houses)) {
        trees.push({ x: 0, y, type: treeType, energy: Math.floor(Math.random() * 51) + 100 });
      }
      if (!rightOpenings.includes(y) && isTileFertile(width - 1, y, fertileTiles) && !isInsideHouse(width - 1, y, houses)) {
        trees.push({ x: width - 1, y, type: treeType, energy: Math.floor(Math.random() * 51) + 100 });
      }
    }
  
    const leftOpeningsSet = new Set(leftOpenings);
    const rightOpeningsSet = new Set(rightOpenings);
  
    for (let x = 4; x < width - 4; x += 4) {
      for (let y = 1; y < height - 1; y++) {
        if (x === 1 && leftOpeningsSet.has(y)) continue;
        if (x === width - 2 && rightOpeningsSet.has(y)) continue;
        if (y % 5 !== 0 && isTileFertile(x, y, fertileTiles) && !isInsideHouse(x, y, houses)) {
          trees.push({ x, y, type: treeType, energy: Math.floor(Math.random() * 51) + 100 });
        }
      }
    }
  
    for (let y = 4; y < height - 4; y += 4) {
      for (let x = 1; x < width - 1; x++) {
        if ((x === 1 && leftOpeningsSet.has(y)) || (x === width - 2 && rightOpeningsSet.has(y))) continue;
        if (x % 5 !== 0 && isTileFertile(x, y, fertileTiles) && !isInsideHouse(x, y, houses)) {
          trees.push({ x, y, type: treeType, energy: Math.floor(Math.random() * 51) + 100 });
        }
      }
    }
  
    for (let i = 0; i < 200; i++) {
      const x = Math.floor(Math.random() * (width - 2)) + 1;
      const y = Math.floor(Math.random() * (height - 2)) + 1;
      if ((x === 1 && leftOpeningsSet.has(y)) || (x === width - 2 && rightOpeningsSet.has(y))) continue;
      if (!trees.some(t => t.x === x && t.y === y) && isTileFertile(x, y, fertileTiles) && !isInsideHouse(x, y, houses)) {
        trees.push({ x, y, type: treeType, energy: Math.floor(Math.random() * 51) + 100 });
      }
    }
  
    return trees;
  }
  