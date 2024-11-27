import { useState } from 'react';
import foot from '../../IMG/BRUJA/foot.png';
import cloth from '../../IMG/BRUJA/cloth.png';
import skin from '../../IMG/BRUJA/skin.png';
import hair from '../../IMG/BRUJA/hair.png';
import eyes from '../../IMG/BRUJA/eyes.png';
import styles from './Customize.module.css'; // Importa el módulo CSS

const colorOptions = {
  clothes: [0, 120, 240], // Ángulos para la ropa
  skin: [0, 30, 60],      // Ángulos para la piel
  hair: [0, 90, 180],     // Ángulos para el cabello
  eyes: [0, 60, 120],     // Ángulos para los ojos
};

const Customize = () => {
  const [selectedHues, setSelectedHues] = useState({
    clothes: 0,
    skin: 0,
    hair: 0,
    eyes: 0,
  });

  const handleHueChange = (part, hue) => {
    setSelectedHues((prevHues) => ({
      ...prevHues,
      [part]: hue,
    }));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Personaliza tu personaje</h1>

      {/* Mostrar imagen con capas */}
      <div className={styles.layerContainer}>
        <img src={foot} alt="Feet" style={{ position: 'absolute', bottom: 0, width: '100%', height: 'auto' }} />
        <img
          src={cloth}
          alt="Clothes"
          className={styles.layer}
          style={{
            filter: `hue-rotate(${selectedHues.clothes}deg)`,
            position: 'fixed',
            bottom: '50px',
            width: '130px',
            height: 'auto',
          }}
        />
        <img
          src={skin}
          alt="Skin"
          className={styles.layer}
          style={{
            filter: `hue-rotate(${selectedHues.skin}deg)`,
            position: 'fixed',
            bottom: '50px',
            width: '130px',
            height: 'auto',
          }}
        />
        <img
          src={hair}
          alt="Hair"
          className={styles.layer}
          style={{
            filter: `hue-rotate(${selectedHues.hair}deg)`,
            position: 'fixed',
            bottom: '50px',
            width: '130px',
            height: 'auto',
          }}
        />
        <img
          src={eyes}
          alt="Eyes"
          className={styles.layer}
          style={{
            filter: `hue-rotate(${selectedHues.eyes}deg)`,
            position: 'fixed',
            bottom: '50px',
            width: '130px',
            height: 'auto',
          }}
        />
      </div>

      {/* Controles para seleccionar colores */}
      <div>
        {Object.keys(colorOptions).map((part) => (
          <div key={part}>
            <h2>Elige color para {part}</h2>
            {colorOptions[part].map((hue) => (
              <button
                key={hue}
                onClick={() => handleHueChange(part, hue)}
                style={{
                  backgroundColor: `hsl(${hue}, 100%, 50%)`, // Muestra el color basado en HSL
                  border: 'none',
                  padding: '10px',
                  margin: '5px',
                  cursor: 'pointer',
                  color: '#fff',
                }}
              >
                {`Hue ${hue}°`}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customize;
