import React, { useState } from "react";
import styles from "./Quest.module.css";

const Quest = () => {
  const [quests, setQuests] = useState([
    { id: 1, title: "Derrota al Guardián de Fuego", status: "disponible" },
    { id: 2, title: "Recolecta Cristales de Agua", status: "activa" },
    { id: 3, title: "Explora el Bosque del Viento", status: "completada" },
  ]);

  const handleAcceptQuest = (id) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === id ? { ...quest, status: "activa" } : quest
      )
    );
  };

  return (
    <div className={styles.questPage}>
      <h2>Misiones</h2>
      <ul>
        {quests.map((quest) => (
          <li key={quest.id} className={styles[quest.status]}>
            <strong>{quest.title}</strong> - <em>{quest.status}</em>
            {quest.status === "disponible" && (
              <button onClick={() => handleAcceptQuest(quest.id)}>Aceptar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quest;
