import React, { useState } from "react";
import styles from "./QuestLog.module.css";

const QuestLog = () => {
  const [quests, setQuests] = useState([
    { id: 1, title: "Derrota al Guardián de Fuego", status: "activa" },
    { id: 2, title: "Recolecta Cristales de Agua", status: "completada" },
  ]);

  return (
    <div className={styles.questLog}>
      <h2>Registro de Misiones</h2>
      <ul>
        {quests.map((quest) => (
          <li
            key={quest.id}
            className={
              quest.status === "completada"
                ? styles.completedQuest
                : styles.activeQuest
            }
          >
            {quest.title} - <em>{quest.status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestLog;
