import styles from "./Create.module.css";
import CreateGender from "./CreateGender";
import { useState } from "react";
import { ImDiamonds } from "react-icons/im";
import { GiCorkedTube } from "react-icons/gi";
import { RiDashboard3Line } from "react-icons/ri";
import Avatar from '../Player/Avatar.jsx';
import zodiacSigns from '../Utils/astros/sol.json';




const Create = () => {
  const [name, setName] = useState('');
  const [selectedSkin, setSelectedSkin] = useState(0);

  const [birthDate, setBirthDate] = useState('');
const [signoSolar, setSignoSolar] = useState('');

const calcularSigno = (fecha) => {
  if (!fecha) return;

  const [year, month, day] = fecha.split("-").map(Number);
  const mmdd = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  for (let signo of zodiacSigns) {
    const inicio = signo.inicio;
    const fin = signo.fin;

    // Capricornio pasa de diciembre a enero
    if (signo.signo === "Capricornio") {
      if (mmdd >= inicio || mmdd <= fin) {
        return signo.signo;
      }
    } else {
      if (mmdd >= inicio && mmdd <= fin) {
        return signo.signo;
      }
    }
  }

  return "Desconocido";
};


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
      <div className={styles.createContainer}>
      <Avatar selectedSkin={selectedSkin} />
      </div>
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

      {/* Fecha de nacimiento y signo solar */}
<div className={styles.birthContainer}>
  <label htmlFor="birthdate" className={styles.label}>
    <h4>Fecha de nacimiento</h4>
  </label>
  <input
    type="date"
    id="birthdate"
    value={birthDate}
    onChange={(e) => {
      const fecha = e.target.value;
      setBirthDate(fecha);
      setSignoSolar(calcularSigno(fecha));
    }}
    className={styles.dateInput}
  />
  {signoSolar && (
    <p className={styles.signo}>
      Signo solar: <strong> dato{signoSolar}</strong>
    </p>
  )}
</div>
    </div>
  );
};

export default Create;
