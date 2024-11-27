// Display.jsx
import React from 'react';

const Display = ({ name, level, position }) => {
  if (!position) return null; // Asegúrate de que position no sea null o undefined

  return (
    <div className="display">
      <h2>{name}</h2>
      <p>Nivel: {level}</p>
      <p>Posición: X: {position.x}, Y: {position.y}</p>
      {/* Aquí puedes agregar más elementos según sea necesario */}
    </div>
  );
};

export default Display;
