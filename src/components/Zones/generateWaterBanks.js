const zodiacWaterAmounts = {
  aries: 110,
  tauro: 140,
  geminis: 150,
  cancer: 1000,
  leo: 100,
  virgo: 150,
  libra: 155,
  escorpio: 1500,
  sagitario: 90,
  capricornio: 135,
  acuario: 160,
  piscis: 2000,
  default: 150,
};

function normalizeZoneName(zone) {
  return zone
    .toLowerCase()
    .normalize("NFD") // Quita tildes
    .replace(/[\u0300-\u036f]/g, "");
}
export function generateWaterBanks(width = 120, height = 40, currentZone) {
  const waterTiles = [];
  const occupied = new Set();

  // Normaliza el nombre del signo
  const lowerZone = normalizeZoneName(currentZone || 'default');
  const maxWaterTiles = zodiacWaterAmounts[lowerZone] || zodiacWaterAmounts.default;

  // --- 1. Generar el río ondulado de izquierda a derecha ---
  let currentY = Math.floor(Math.random() * height);
  let currentX = 0;
  waterTiles.push({ x: currentX, y: currentY });
  occupied.add(`${currentX},${currentY}`);

  while (currentX < width - 1) {
    const possibleMoves = [];
    if (currentY > 0) possibleMoves.push({ dx: 1, dy: -1 });
    possibleMoves.push({ dx: 1, dy: 0 });
    if (currentY < height - 1) possibleMoves.push({ dx: 1, dy: 1 });

    const validMoves = possibleMoves.filter(({ dx, dy }) => {
      const newX = currentX + dx;
      const newY = currentY + dy;
      return (
        newX >= 0 && newX < width &&
        newY >= 0 && newY < height &&
        !occupied.has(`${newX},${newY}`)
      );
    });

    if (validMoves.length === 0) break;

    let move;
    if (Math.random() < 0.6) {
      move = validMoves.find(m => m.dy === 0) || validMoves[Math.floor(Math.random() * validMoves.length)];
    } else {
      move = validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    currentX += move.dx;
    currentY += move.dy;
    waterTiles.push({ x: currentX, y: currentY });
    occupied.add(`${currentX},${currentY}`);
  }

  // --- 2. Expandir hasta la cantidad máxima de tiles de agua según el signo ---
  while (waterTiles.length < maxWaterTiles) {
    const candidates = [];

    for (const tile of waterTiles) {
      const neighbors = [
        { x: tile.x + 1, y: tile.y },
        { x: tile.x - 1, y: tile.y },
        { x: tile.x, y: tile.y + 1 },
        { x: tile.x, y: tile.y - 1 }
      ];
      for (const n of neighbors) {
        const key = `${n.x},${n.y}`;
        if (
          n.x >= 0 && n.x < width &&
          n.y >= 0 && n.y < height &&
          !occupied.has(key)
        ) {
          candidates.push(n);
          occupied.add(key); // Marcar como candidato para evitar duplicados
        }
      }
    }

    if (candidates.length === 0) break;

    const newTile = candidates[Math.floor(Math.random() * candidates.length)];
    waterTiles.push(newTile);
    // No hace falta volver a agregar a occupied, ya está marcado arriba
  }

  return waterTiles;
}
