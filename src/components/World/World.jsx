// src/components/World.jsx
import { useState } from 'react';
import styles from './World.module.css';
import Isla from './Islas/Isla';
import Display from './Display/Display';
import Teclado from './Teclado/Teclado';
import Mochila from './Mochila/Mochila'; // Importa el componente Mochila

const World = () => {
  const getCharForIndex = (index) => String.fromCharCode(65 + index);

  const [board, setBoard] = useState(() =>
    Array.from({ length: 12 }, (_, rowIndex) =>
      Array.from({ length: 12 }, (_, colIndex) => ({
        house: 'CASA',
        type: 'AGUA',
        ocupado: false,
        dominio: 'LIBRE',
        contenido: 'VACIO',
        bloqueado: false,
        col: getCharForIndex(colIndex),
        row: rowIndex + 1,
      }))
    )
  );

  const [position, setPosition] = useState({ row: 4, col: 2 });

  // Estado para los tipos de casilleros habilitados
  const [enabledTypes, setEnabledTypes] = useState(['TIERRA']);

  const colocarIsla = () => {
    const newBoard = JSON.parse(JSON.stringify(board));
    for (let i = 2; i < 10; i++) {
      for (let j = 2; j < 10; j++) {
        newBoard[i][j] = {
          ...newBoard[i][j],
          type: 'TIERRA',
          ocupado: true,
          contenido: 'ISLA',
        };
      }
    }
    return newBoard;
  };

  const updatedBoard = colocarIsla();

  const [action, setAction] = useState(null);

  return (
    <div className={styles.world}>
      {updatedBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`${styles.cell} ${styles[cell.type]}`}
          >
            {rowIndex === position.row && colIndex === position.col && (
              <Teclado
                position={position}
                setPosition={setPosition}
                board={updatedBoard}
                enabledTypes={enabledTypes}
                setAction={setAction}
              />
            )}
          </div>
        ))
      )}
      <Isla board={updatedBoard} />
      <Display action={action} />
      <Mochila /> {/* Añade el componente Mochila */}
    </div>
  );
};

export default World;
