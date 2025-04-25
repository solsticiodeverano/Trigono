import React, { useState } from "react";
import styles from "./CharacterSkills.module.css";

const allSkills = [
  { id: 1, name: "Fuego Triple", type: "Fuego", icon: "🔥", description: "Tres bolas de fuego que queman al enemigo." },
  { id: 2, name: "Rayo de Fuego", type: "Fuego", icon: "💥", description: "Un rayo ardiente que atraviesa defensas." },
  { id: 3, name: "Disparo de Agua", type: "Agua", icon: "💧", description: "Un chorro de agua que empuja al enemigo." },
  { id: 4, name: "Hiedra Venenosa", type: "Tierra", icon: "🌿", description: "Plantas que enredan y envenenan." },
  { id: 5, name: "Ráfaga de Viento", type: "Aire", icon: "🌬️", description: "Un viento fuerte que desestabiliza." },
  { id: 6, name: "Tornado", type: "Aire", icon: "🌪️", description: "Un remolino que golpea a todos los enemigos." }
];

const filters = [
  { label: "🌈", type: "Todos" },
  { label: "🔥", type: "Fuego" },
  { label: "🌬️", type: "Aire" },
  { label: "🌿", type: "Tierra" },
  { label: "💧", type: "Agua" }
];

const CharacterSkills = ({ selectedSkills, setSelectedSkills }) => {
  const [filter, setFilter] = useState("Todos");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filteredSkills = filter === "Todos"
    ? allSkills
    : allSkills.filter((skill) => skill.type === filter);

  const assignSkill = (skill, slot) => {
    const newSkills = [...selectedSkills];
    newSkills[slot] = skill;
    setSelectedSkills(newSkills);
  };

  return (
    <div className={styles.skillsContainer}>
      <div className={styles.filters}>
        {filters.map(({ label, type }) => (
          <button
            key={type}
            className={`${styles.filterButton} ${filter === type ? styles.active : ""}`}
            onClick={() => {
              setFilter(type);
              setSelectedSkill(null);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.iconsRow}>
        {filteredSkills.map((skill) => (
          <button
            key={skill.id}
            className={`${styles.skillIconButton} ${selectedSkill?.id === skill.id ? styles.selected : ""}`}
            onClick={() => setSelectedSkill(skill)}
          >
            {skill.icon}
          </button>
        ))}
      </div>

      {selectedSkill && (
        <div className={styles.skillDetails}>
          <h4>{selectedSkill.name}</h4>
          <p>{selectedSkill.description}</p>
          <div className={styles.slotButtons}>
            {[0, 1, 2, 3].map((i) => (
              <button key={i} onClick={() => assignSkill(selectedSkill, i)}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSkills;
