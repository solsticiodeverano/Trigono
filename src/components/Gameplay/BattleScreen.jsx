import React, { useState } from "react";
import styles from "./BattleScreen.module.css";

const BattleScreen = () => {
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);

  const attacks = [
    { name: "Llamarada", element: "Fuego", damage: 20 },
    { name: "Tsunami", element: "Agua", damage: 15 },
    { name: "Huracán", element: "Viento", damage: 10 },
    { name: "Deslave", element: "Tierra", damage: 25 },
  ];

  const handleAttack = (attack) => {
    setEnemyHP((hp) => Math.max(hp - attack.damage, 0));
    setPlayerHP((hp) => Math.max(hp - Math.floor(attack.damage / 2), 0)); // Simula un contraataque
  };

  return (
    <div className={styles.battleScreen}>
      <h2>Pantalla de Batalla</h2>
      <div className={styles.healthBars}>
        <p>Jugador: {playerHP} HP</p>
        <p>Enemigo: {enemyHP} HP</p>
      </div>
      <div className={styles.attacks}>
        <h3>Ataques Disponibles</h3>
        {attacks.map((attack) => (
          <button
            key={attack.name}
            onClick={() => handleAttack(attack)}
            disabled={enemyHP === 0 || playerHP === 0}
          >
            {attack.name} ({attack.element})
          </button>
        ))}
      </div>
      {enemyHP === 0 && <p>¡Has ganado la batalla!</p>}
      {playerHP === 0 && <p>¡Has perdido la batalla!</p>}
    </div>
  );
};

export default BattleScreen;
