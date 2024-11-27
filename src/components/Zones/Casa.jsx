import React from 'react';
import './Casa.css'; // Asegúrate de crear este archivo CSS para los estilos

const Casa = ({ position }) => {
  const { x, y } = position;

  // Definimos las posiciones de los casilleros de la casa
  const houseTiles = [
    { x: x - 1, y: y - 2 }, // Casillero superior izquierdo
    { x: x, y: y - 2 },     // Casillero superior central
    { x: x + 1, y: y - 2 }, // Casillero superior derecho
    { x: x - 1, y: y - 1 }, // Casillero medio izquierdo
    { x: x, y: y - 1 },     // Casillero medio (puerta)
    { x: x + 1, y: y - 1 }, // Casillero medio derecho
  ];

  return (
    <>
      {houseTiles.map((tile, index) => (
        <div
          key={index}
          className="tile"
          style={{
            position: 'absolute',
            left: `${tile.x * 40}px`, // Cambia el multiplicador según el tamaño del tile
            top: `${tile.y * 40}px`,  // Cambia el multiplicador según el tamaño del tile
            width: '40px', // Ancho de cada casillero
            height: '40px', // Alto de cada casillero
            backgroundColor: tile.y === y - 1 ? 'black' : 'gray', // Color de la puerta y los casilleros
            border: '1px solid black',
          }}
        />
      ))}
    </>
  );
};

export default Casa;
