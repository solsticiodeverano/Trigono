import React, { useState } from "react";
import styles from "./SkillTree.module.css";

const SkillTree = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: "Llamarada", element: "Fuego", unlocked: true },
    { id: 2, name: "Escudo Acuático", element: "Agua", unlocked: false },
    { id: 3, name: "Tornado", element: "Viento", unlocked: false },
    { id: 4, name: "Terremoto", element: "Tierra", unlocked: false },
  ]);

  const unlockSkill = (id) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === id ? { ...skill, unlocked: true } : skill
      )
    );
  };

  return (
    <div className={styles.skillTree}>
      <h2>Árbol de Habilidades</h2>
      <ul>
        {skills.map((skill) => (
          <li
            key={skill.id}
            className={skill.unlocked ? styles.unlocked : styles.locked}
          >
            <strong>{skill.name}</strong> - {skill.element}{" "}
            {!skill.unlocked && (
              <button onClick={() => unlockSkill(skill.id)}>Desbloquear</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillTree;
