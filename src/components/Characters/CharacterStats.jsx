import React, { useState } from "react";
import styles from "./CharacterStats.module.css";

const CharacterStats = () => {
  // Estadísticas iniciales
  const [stats, setStats] = useState({
    agua: 10, // Defensa
    fuego: 15, // Ataque
    viento: 12, // Velocidad
    tierra: 20, // Vida
  });

  return (
    <div className={styles.statsContainer}>
      <h2>Estadísticas del Personaje</h2>
      <ul className={styles.statsList}>
        <li>
          <strong>Defensa (Agua):</strong> {stats.agua}
        </li>
        <li>
          <strong>Ataque (Fuego):</strong> {stats.fuego}
        </li>
        <li>
          <strong>Velocidad (Viento):</strong> {stats.viento}
        </li>
        <li>
          <strong>Vida (Tierra):</strong> {stats.tierra}
        </li>
      </ul>
    </div>
  );
};

export default CharacterStats;
