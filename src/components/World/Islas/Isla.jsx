// Isla.jsx
import React from 'react';
import styles from '../World.module.css';

const Isla = ({ board }) => {
  // Renderizar el tablero actualizado con la isla
  return (
    <>
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`${styles.cell} ${styles[cell.type]}`}
          >
            {/* Puedes agregar contenido específico si es necesario */}
          </div>
        ))
      ))}
    </>
  );
};

export default Isla;
