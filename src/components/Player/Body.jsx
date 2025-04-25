import styles from './Avatar.module.css';
import Ropa from './Ropa'; // no te olvides de importar esto si no está

const getZIndex = (key) => {
  if (key === 'ManoI') return 10;
  return 1;
};

const floatingParts = ['Cara', 'OjoI', 'OjoD', 'Boca', 'ManoI', 'ManoD'];

const colorableKeys = ['ManoI', 'ManoD', 'Cara', 'Cuerpo', 'PiernaI', 'PiernaD', 'PieI', 'PieD', 'Cuello'];

const getSkinFilter = (index) => {
  switch (index) {
    case 0:
      return 'brightness(0.3) saturate(0.5) hue-rotate(180deg)';
    case 1:
      return 'brightness(0.38) saturate(0.5) hue-rotate(180deg)';
    case 2:
      return 'brightness(0.43) saturate(0.4) hue-rotate(180deg)';
    case 3:
      return 'brightness(0.6) saturate(0.2) hue-rotate(180deg)';
    case 4:
      return 'brightness(0.8) saturate(0.4) hue-rotate(180deg)';
    case 5:
      return 'brightness(0.9) saturate(0.2) hue-rotate(180deg)';
    default:
      return 'none';
  }
};



const classMap = {
  Cara: styles.headFloating,
  OjoI: styles.headFloating,
  OjoD: styles.headFloating,
  Boca: styles.headFloating,
  Cuerpo: styles.cuerpo, // si tenés sombra aplicada desde CSS
};

const Body = ({
  Sombra, Cuerpo, Cuello, PiernaI, PiernaD,
  PieI, PieD, ManoI, ManoD, Cara, OjoI, OjoD, Boca,
  ropa, skinIndex
}) => {
    const renderLayer = (src, key) => {
        if (!src) return null;
      
        const isColorable = colorableKeys.includes(key);
        const filterStyle = isColorable
  ? { filter: getSkinFilter(skinIndex) }
  : {};
      
        return (
          <img
            key={key}
            src={src}
            alt={key}
            style={{ ...layerStyle, ...filterStyle, zIndex: getZIndex(key) }}
            className={classMap[key] || ''}
          />
        );
      };
      

  const layers = [
    { key: 'Sombra', src: Sombra },
    { key: 'Cuerpo', src: Cuerpo },
    { key: 'PiernaI', src: PiernaI },
    { key: 'PiernaD', src: PiernaD },
    { key: 'PieI', src: PieI },
    { key: 'PieD', src: PieD },
    { key: 'Cuello', src: Cuello },
    { key: 'ManoI', src: ManoI },
    { key: 'ManoD', src: ManoD },
    { key: 'Cara', src: Cara },
    { key: 'OjoI', src: OjoI },
    { key: 'OjoD', src: OjoD },
    { key: 'Boca', src: Boca }
  ];

  return (
    <div style={containerStyle}>
      {layers.map(({ key, src }) => renderLayer(src, key))}
      {ropa && <Ropa {...ropa} />}
    </div>
  );
};

const containerStyle = {
  position: 'relative',
  width: '300px',
  height: '300px'
};

const layerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain'
};

export default Body;
