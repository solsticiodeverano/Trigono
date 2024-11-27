import React, { useState, useEffect } from 'react';
import { FaPerson } from 'react-icons/fa6';
import styles from './Player.module.css';
import Fuego from '../Powers/Fuego'; // Importa el componente Fuego

const Player = ({ initialPosition, gridSize, semillasPlantadas, posicionesRio }) => {
    const [position, setPosition] = useState(initialPosition);

    const isWithinBounds = (x, y) => {
        return x >= 0 && x < gridSize.width && y >= 0 && y < gridSize.height;
    };

    const isCellOccupied = (x, y) => {
        return semillasPlantadas[y][x] !== null;
    };

    const isRio = (x, y) => {
        return posicionesRio.some(pos => pos.x === x && pos.y === y);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            let newX = position.x;
            let newY = position.y;

            if (e.key === 'ArrowUp') {
                newY -= 1;
            } else if (e.key === 'ArrowDown') {
                newY += 1;
            } else if (e.key === 'ArrowLeft') {
                newX -= 1;
            } else if (e.key === 'ArrowRight') {
                newX += 1;
            }

            if (isWithinBounds(newX, newY) && !isCellOccupied(newX, newY) && !isRio(newX, newY)) {
                setPosition({ x: newX, y: newY });
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [position, gridSize, semillasPlantadas, posicionesRio]);

    return (
        <>
            <div
                className={styles.player}
                style={{
                    gridColumnStart: position.x + 1,
                    gridRowStart: position.y + 1,
                }}
            >
                <FaPerson />
            </div>
            <Fuego playerPosition={position} /> {/* Pasa la posición actual del jugador a Fuego */}
        </>
    );
};

export default Player;
