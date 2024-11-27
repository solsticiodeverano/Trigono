import React, { useState } from "react";
import styles from "./CharacterCreation.module.css";

const CharacterCreation = () => {
  const [name, setName] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const elements = ["Fuego", "Agua", "Viento", "Tierra"];

  const handleSubmit = () => {
    if (name && selectedElement) {
      alert(`¡Personaje creado!\nNombre: ${name}\nElemento: ${selectedElement}`);
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  return (
    <div className={styles.characterCreation}>
      <h2>Creación de Personaje</h2>
      <div className={styles.form}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Introduce un nombre"
          />
        </label>
        <div className={styles.elements}>
          <p>Selecciona un elemento inicial:</p>
          {elements.map((element) => (
            <button
              key={element}
              className={selectedElement === element ? styles.selected : ""}
              onClick={() => setSelectedElement(element)}
            >
              {element}
            </button>
          ))}
        </div>
        <button onClick={handleSubmit}>Crear Personaje</button>
      </div>
    </div>
  );
};

export default CharacterCreation;
