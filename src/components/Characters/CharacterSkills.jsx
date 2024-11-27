import React, { useState } from "react";
import styles from "./CharacterSkills.module.css";

const CharacterSkills = () => {
  // Habilidades iniciales
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: "Ráfaga",
      type: "Viento",
      description: "Una explosión de viento que inflige daño a los enemigos cercanos.",
    },
  ]);

  return (
    <div className={styles.skillsContainer}>
      <h2>Habilidades del Personaje</h2>
      <ul className={styles.skillsList}>
        {skills.map((skill) => (
          <li key={skill.id} className={styles.skillItem}>
            <h3>{skill.name}</h3>
            <p>
              <strong>Tipo:</strong> {skill.type}
            </p>
            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterSkills;
