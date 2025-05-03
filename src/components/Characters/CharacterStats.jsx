import React, { useState } from "react";
import styles from "./CharacterStats.module.css";

const MAX_TOTAL = 700;

const CharacterStats = () => {
  const [elements, setElements] = useState({
    tierra: 300,
    viento: 400,
    fuego: 500,
    agua: 200,
  });

  const getBarStyle = (leftValue, rightValue, leftColor, rightColor) => {
    const total = leftValue + rightValue;
    const leftPercent = (leftValue / total) * 100;
    const rightPercent = 100 - leftPercent;

    return {
      background: `linear-gradient(to right, ${leftColor} ${leftPercent}%, ${rightColor} ${rightPercent}%)`,
    };
  };

  return (
    <div className={styles.statsContainer}>
      <h2>Energías Elementales</h2>

      <div className={styles.barWrapper}>
        <div className={styles.label}>
          🌍 Tierra ({elements.tierra}) — 💨 Viento ({elements.viento})
        </div>
        <div
          className={styles.dualBar}
          style={getBarStyle(elements.tierra, elements.viento, "#8B4513", "#00CED1")}
        ></div>
      </div>

      <div className={styles.barWrapper}>
        <div className={styles.label}>
          🔥 Fuego ({elements.fuego}) — 💧 Agua ({elements.agua})
        </div>
        <div
          className={styles.dualBar}
          style={getBarStyle(elements.fuego, elements.agua, "#FF4500", "#1E90FF")}
        ></div>
      </div>
    </div>
  );
};

export default CharacterStats;
