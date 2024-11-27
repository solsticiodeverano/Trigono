// src/components/Display.jsx
import React, { useState, useEffect } from 'react';
import styles from './Display.module.css';

const MAX_HP = 1200;
const NAME = 'AX';

const Display = ({ action }) => {
  const [hp, setHp] = useState({
    water: MAX_HP,
    earth: MAX_HP,
    fire: MAX_HP,
    air: MAX_HP,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (action === 'defend') {
        setHp((prevHp) => ({
          ...prevHp,
          water: Math.max(prevHp.water - 3, 0),
        }));
      } else if (action === 'speed') {
        setHp((prevHp) => ({
          ...prevHp,
          air: Math.max(prevHp.air - 3, 0),
        }));
      } else if (action === 'attack') {
        setHp((prevHp) => ({
          ...prevHp,
          fire: Math.max(prevHp.fire - 10, 0),
        }));
      } else {
        // No action, do nothing
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [action]);

  const getBarColor = (element) => {
    const value = hp[element];
    if (value <= MAX_HP * 0.25) {
      switch (element) {
        case 'water': return styles.lightBlue;
        case 'earth': return styles.lightGreen;
        case 'fire': return styles.lightRed;
        case 'air': return styles.pink;
        default: return '';
      }
    } else if (value <= MAX_HP * 0.5) {
      switch (element) {
        case 'water': return styles.cyan;
        case 'earth': return styles.yellowGreen;
        case 'fire': return styles.orange;
        case 'air': return styles.purple;
        default: return '';
      }
    } else {
      switch (element) {
        case 'water': return styles.blue;
        case 'earth': return styles.green;
        case 'fire': return styles.red;
        case 'air': return styles.darkViolet;
        default: return '';
      }
    }
  };

  const gameOver = Object.values(hp).filter(value => value === 0).length >= 2;

  return (
    <div className={styles.display}>
      <div className={styles.info}>
        <h1>{NAME}</h1>
        <h2>Nivel</h2>
      </div>
      <div className={styles.bars}>
        {['water', 'earth', 'fire', 'air'].map((element) => (
          <div key={element} className={styles.barContainer}>
            <div className={`${styles.bar} ${getBarColor(element)}`} style={{ width: `${(hp[element] / MAX_HP) * 100}%` }}></div>
          </div>
        ))}
      </div>
      {gameOver && <div className={styles.gameOver}>Game Over</div>}
    </div>
  );
};

export default Display;
