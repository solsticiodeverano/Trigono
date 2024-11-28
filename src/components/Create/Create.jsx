import styles from "./Create.module.css";
import CreateGender from "./CreateGender";
import { useState } from "react";
import { ImDiamonds } from "react-icons/im";
import { GiCorkedTube } from "react-icons/gi";
import { RiDashboard3Line } from "react-icons/ri";




const Create = () => {
  const [name, setName] = useState('');
  const [selectedSkin, setSelectedSkin] = useState(0);

  const skinColors = [
    "#182425", // Dark
    "#283435", // Brown
    "#384445", // Medium
    "#485455", // Light Brown
    "#677475", // Pale
    "#f0f0f0", // Fair
  ];

  return (
    <div>
      <div className={styles.title}> <h3>< GiCorkedTube/></h3>Incubadora</div>

      {/* Nombre */}
      <div className={styles.nameContainer}>
        <div className={styles.pin}>      <ImDiamonds/>
        </div>
        <label htmlFor="name" className={styles.label}>
       <h4>Apodo</h4>   
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.nameInput}
          placeholder="..."
        />
      </div>

      {/* Género */}
      <CreateGender />

      {/* Color de piel */}
      <div className={styles.skinContainer}>
      <RiDashboard3Line/>
        <h2 className={styles.label}>Elegí un tono</h2>
        <div className={styles.skinColors}>
          {skinColors.map((color, index) => (
            <div
              key={index}
              className={`${styles.skinCircle} ${
                selectedSkin === index ? styles.selected : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedSkin(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Mostrar selección */}
      <div className={styles.summary}>
        <p className={styles.selectedName}>{name || ""}</p>
        <p className={styles.selectedSkin}>
          {" "}
          <span
            style={{
              color: skinColors[selectedSkin],
              textShadow: `0 0 10px ${skinColors[selectedSkin]}`,
            }}
          >
            {selectedSkin + 1}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Create;
