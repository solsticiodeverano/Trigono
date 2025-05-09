// Display.jsx
/* eslint-disable react/prop-types */
import styles from './Display.module.css';
import CharacterInventory from '../Characters/CharacterInventory'
import SelectedPower from '../Characters/SelectedPower';
import CharacterSkills from '../Characters/CharacterSkills'
import { useState } from 'react';

const Display = ({
  name = "AX",
  level = 1,
  position = { x: 0, y: 0 },
  direction = "down",
  stats = { tierra: 100, fuego: 80, viento: 60, agua: 90 },
  selectedPower,
  isOpen = false,
  onClose,
  onOpen,
  pointerPos,
  inventory,
  setInventory,
  onDropItemToWorld,
  selectedWeapon,
  onEquipWeapon,
}) => {
  const maxStats = {
    tierra: 100,
    fuego: 100,
    viento: 100,
    agua: 100,
  };

  const [selectedShield, setSelectedShield] = useState(null);
  const [selectedUtils, setSelectedUtils] = useState(null);
  const [selectedBeast, setSelectedBeast] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([null, null, null, null]);

  const handleToggle = () => {
    isOpen ? onClose() : onOpen();
  };

  const getBarColor = (stat) => {
    switch (stat) {
      case "tierra": return "#8B4513";
      case "fuego": return "#FF4500";
      case "viento": return "#1E90FF";
      case "agua": return "#00CED1";
      default: return "gray";
    }
  };

  const renderBar = (label, value, max) => (
    <div key={label} className={styles.stat}>
      <div className={styles.label}>{label}: {value}/{max}</div>
      <div className={styles.barContainer}>
        <div
          className={styles.bar}
          style={{ width: `${(value / max) * 100}%`, backgroundColor: getBarColor(label) }}
        />
      </div>
    </div>
  );

  return (
    <div className={`${styles.display} ${isOpen ? styles.open : styles.closed}`}>
      <button className={styles.toggleButton} onClick={handleToggle}>
        {isOpen ? '✖' : '☰'}
      </button>
      <section className={styles.hiddenData}>
        {isOpen && (
          <>
            <div className={styles.avatar}>
              <CharacterSkills
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
              />
              {}
            </div>
            <div className={styles.mochila}>
              <h3>Mochila</h3>
              <CharacterInventory
                inventory={inventory}
                onDropItemToWorld={onDropItemToWorld}
                pointerPos={pointerPos} 
                setInventory={setInventory}
                onEquip={(item) => {
                  if (item.category === "weapons") onEquipWeapon(item);
    if (item.category === "shield") setSelectedShield(item);
                  else if (item.category === "utils") setSelectedUtils(item);
                  else if (item.category === "beast") setSelectedBeast(item);
                }}
              />
            </div>
          </>
        )}
      </section>
      <section className={styles.fixData}>
        <div className={styles.info}>
          <h1>{name}</h1>
          <h2>Nivel: {level}</h2>
          <p>Posición: ({position.x}, {position.y})</p>
          <p>Pointer: ({pointerPos.x}, {pointerPos.y})</p>
        </div>

        <div className={styles.bars}>
          {Object.keys(stats).map((stat) =>
            renderBar(stat, stats[stat], maxStats[stat])
          )}
        </div>

        {selectedPower && (
          <div className={styles.power}>
            <SelectedPower
              selectedWeapon={selectedWeapon}
              selectedShield={selectedShield}
              selectedUtils={selectedUtils}
              selectedBeast={selectedBeast}
              selectedSkills={selectedSkills}
            />

          </div>
        )}
      </section>


    </div>

  );
};

export default Display;
