// Personaje.jsx
import React from 'react';
import styles from './Personaje.module.css';

const Personaje = ({ position, action }) => {
  return (
    <div className={styles.personaje}>
      {action === 'attack' && (
        <div className={styles.attack}></div>
      )}
      {action === 'defend' && (
        <div className={styles.defend}></div>
      )}
    </div>
  );
};

export default Personaje;
