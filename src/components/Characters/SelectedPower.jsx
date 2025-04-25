import React from "react";
import styles from "./SelectedPower.module.css";

const handleAssignSkill = (skill, targetIndex) => {
    setSelectedSkills((prevSkills) => {
      const newSkills = [...prevSkills];
  
      // Buscar si la habilidad ya está en otro slot
      const existingIndex = newSkills.findIndex(
        (s) => s?.id === skill.id
      );
  
      if (existingIndex !== -1) {
        // Ya estaba: intercambiamos los slots
        const temp = newSkills[targetIndex];
        newSkills[targetIndex] = skill;
        newSkills[existingIndex] = temp;
      } else {
        // No estaba: simplemente la asignamos al target
        newSkills[targetIndex] = skill;
      }
  
      return newSkills;
    });
  };
  
const SelectedPower = ({
  selectedWeapon,
  selectedShield,
  selectedBeast,
  selectedSkills = [],
  setSelectedSkills
}) => {
  // Maneja el click en uno de los slots
  const handleSkillClick = (indexClicked) => {
    return () => {
      const skill = selectedSkills[indexClicked];
      if (!skill) return; // si no hay skill en ese slot, no hacer nada

      // Buscar si esta skill ya está en otro slot (distinto)
      const otherIndex = selectedSkills.findIndex(
        (s, idx) => s?.id === skill.id && idx !== indexClicked
      );

      if (otherIndex !== -1) {
        // Intercambiar de lugar
        const updated = [...selectedSkills];
        [updated[otherIndex], updated[indexClicked]] = [
          updated[indexClicked],
          updated[otherIndex]
        ];
        setSelectedSkills(updated);
      }
    };
  };

  return (
    <div className={styles.selectedPowerContainer}>
      <div className={styles.topRow}>
        <div className={styles.circleLarge}>{selectedWeapon?.icon || "❓"}</div>
        <div className={styles.circleSmall}>{selectedShield?.icon || "❓"}</div>
        <div className={styles.circleLarge}>{selectedBeast?.icon || "❓"}</div>
      </div>
      <div className={styles.skillsRow}>
        {selectedSkills.map((skill, index) => (
          <div
            key={index}
            className={styles.skillCircle}
            onClick={handleSkillClick(index)}
          >
            {skill?.icon || "❓"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedPower;
