import { useState } from "react";
import styles from "./QuestLog.module.css";
import { loadGameData } from "../../loaders/LoadGameData";

const QuestLog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState("Acuario");
  const [missionType, setMissionType] = useState("transito"); // Puede ser 'transito' o 'natal'

  // Aquí se agregarían las misiones de tránsito y natal para cada signo
  const missions = {
    Acuario: {
      transito: "⭐️ Transito Acuario",
      natal: "☀️ Natal Acuario",
    },
    Leo: {
      transito: "⭐️ Transito Leo",
      natal: "☀️ Natal Leo",
    },
    // Agregar los demás signos con sus misiones
  };

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  const handleMissionTypeChange = (type) => {
    setMissionType(type);
  };

  return (
    <div className={styles.questLog}>
      {/* Componente cerrado */}
      {!isOpen && (
        <div className={styles.closed}>
          <span>{missions[selectedMission]?.transito}</span>
          <button onClick={handleOpenClose}>Abrir</button>
        </div>
      )}

      {/* Componente abierto */}
      {isOpen && (
        <div className={styles.open}>
          <button onClick={handleOpenClose}>Cerrar</button>
          <div className={styles.missionTypeButtons}>
            <button onClick={() => handleMissionTypeChange("transito")}>Transito</button>
            <button onClick={() => handleMissionTypeChange("natal")}>Natal</button>
          </div>
          <div className={styles.astros}>
            {/* Mostrar los emoticones de los astros según la misión seleccionada */}
            <div>{missions[selectedMission][missionType]}</div>
            {/* Aquí se agregarían los emoticones de los astros */}
            <div>☿️ Venus en {selectedMission}</div>
            <div>♂️ Marte en {selectedMission}</div>
            <div>♃ Júpiter en {selectedMission}</div>
            <div>☀️ Sol en {selectedMission}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestLog;
