import React, { useRef, useEffect } from 'react';

const LightingOverlay = ({
  lightTiles,
  screenWidth,
  screenHeight,
  tileSize,
  radius = 0.5,
  startX = 0,
  startY = 0,
}) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cubre todo de negro
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0,0,0,0.90)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Para cada lightTile, recorta un círculo degradé
    for (const tile of lightTiles) {
      const centerX = (tile.x - startX) * tileSize + tileSize / 2;
      const centerY = (tile.y - startY) * tileSize + tileSize / 2;
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * tileSize);
grad.addColorStop(0, 'rgba(0,0,0,0.7)');     // Centro: totalmente transparente
grad.addColorStop(0.7, 'rgba(0,0,0,0.1)'); // 70% del radio: algo de sombra
grad.addColorStop(1, 'rgba(0,0,0,0)');     // Borde: completamente negro

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * tileSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
  }, [lightTiles, screenWidth, screenHeight, tileSize, radius, startX, startY]);

  return (
    <canvas
      ref={canvasRef}
      width={screenWidth * tileSize}
      height={screenHeight * tileSize}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    />
  );
};

export default LightingOverlay;
