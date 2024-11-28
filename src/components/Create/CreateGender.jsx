import React, { useState } from 'react';
import { CgGenderMale } from "react-icons/cg";
import { MdFemale } from "react-icons/md";
import { TbGenderGenderqueer } from "react-icons/tb";
import styles from "./CreateGender.module.css";

const CreateGender = () => {
  const [selectedGender, setSelectedGender] = useState('mujer');

  // Lista de géneros con íconos y clases específicas para su posición
  const genders = [
    { name: 'mujer', icon: <MdFemale />, className: styles.gender0 },
    { name: 'hombre', icon: <CgGenderMale />, className: styles.gender1 },
    { name: 'diversidad', icon: <TbGenderGenderqueer />, className: styles.gender2 },
  ];

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className={styles.question}>Elegí tu género</h1>
      <div className={styles.gendersContainer}>
        {genders.map((gender) => (
          <div
            key={gender.name}
            className={`${styles.genders} ${selectedGender === gender.name ? styles.selected : ''} ${gender.className}`}
            onClick={() => handleGenderChange(gender.name)}
          >
            <div className={styles.gender}>{gender.icon}</div>
          </div>
        ))}
        
      </div>
      <h4 className={styles.selectedGenderText}>{selectedGender}</h4>

    </div>
  );
};

export default CreateGender;
