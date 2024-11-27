// src/components/Teclado/Teclado.jsx
import React, { useEffect, useState } from 'react';
import styles from './Teclado.module.css';
import Personaje from '../Personaje/Personaje';

const Teclado = ({ position, setPosition, board, enabledTypes, setAction }) => {
  const handleKeyDown = (event) => {
    const { key } = event;
    let newPosition = { ...position };

    switch (key) {
      case 'ArrowUp':
        if (newPosition.row > 0) newPosition.row -= 1;
        break;
      case 'ArrowDown':
        if (newPosition.row < 11) newPosition.row += 1;
        break;
      case 'ArrowLeft':
        if (newPosition.col > 0) newPosition.col -= 1;
        break;
      case 'ArrowRight':
        if (newPosition.col < 11) newPosition.col += 1;
        break;
      case 'x':
        setAction('attack');
        break;
      case ' ':
        setAction('defend');
        break;
      case 'v':
        setAction('speed');
        break;
      default:
        break;
    }

    // Verificar si el nuevo casillero es de un tipo habilitado
    const newCellType = board[newPosition.row][newPosition.col].type;
    if (enabledTypes.includes(newCellType)) {
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, board, enabledTypes]);

  return (
    <div className={styles.teclado}>
      <Personaje position={position} />
    </div>
  );
};

export default Teclado;
