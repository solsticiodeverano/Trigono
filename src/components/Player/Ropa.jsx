// Ropa.jsx
import styles from './Avatar.module.css';

const baseStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain'
};

const getZIndex = (key) => {
  if (key === 'CapuchaB') return 0;
  if (key === 'MangaI') return 10;
  if (key === 'MangaD') return 1;
  return 2;
};

const classMap = {
  CapaD: styles.capa,
  CapaI: styles.capa,
  MangaD: styles.manga,
  MangaI: styles.manga,
  CuelloI: styles.cuello,
  CapuchaF: styles.capucha,
  CapuchaB: styles.capucha,
  BotaI: styles.botas,
  BotaD: styles.botas
};

const animatedKeys = ['CapuchaF', 'CapuchaB']; // Partes que se van a animar
const wavingDKeys = ['CapaD', 'MangaD'];
const wavingIKeys = ['CapaI', 'MangaI'];


const Ropa = (props) => {
  const keys = Object.keys(props);

  return (
    <>
      {keys.map((key) => {
        const src = props[key];
        if (!src) return null;

        const baseClass = classMap[key] || '';
        const animateClass = animatedKeys.includes(key) ? styles.capuchaFloating : '';
        const waveDClass = wavingDKeys.includes(key) ? styles.capaDWave : '';
        const waveIClass = wavingIKeys.includes(key) ? styles.capaIWave : '';
        const combinedClass = [baseClass, animateClass, waveDClass, waveIClass].join(' ').trim();
        
        return (
          <img
            key={key}
            src={src}
            alt={key}
            style={{ ...baseStyle, zIndex: getZIndex(key) }}
            className={combinedClass}
          />
        );
      })}
    </>
  );
};

export default Ropa;
