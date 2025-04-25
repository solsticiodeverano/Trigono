// Movements.jsx
import Avatar from './Avatar';
import useAvatarControls from './Keys';

const Movements = ({ selectedSkin }) => {
  const { direction, lookUp } = useAvatarControls();

  const isFacingLeft = direction === 'left';

  const ropa = {
    BotaI: 'Body/BotaI.svg',
    BotaD: 'Body/BotaD.svg',
    CapaD: 'Body/CapaD.svg',
    CapaI: 'Body/CapaI.svg',
    MangaD: 'Body/MangaD.svg',
    MangaI: 'Body/MangaI.svg',
    CuelloI: 'Body/CuelloI.svg',
    CapuchaF: lookUp ? 'Body/EspaldaCapucha.svg' : 'Body/CapuchaF.svg', // cambio dinámico
    CapuchaB: 'Body/CapuchaB.svg',
    CapuchaSombra: 'Body/CapuchaSombra.svg',
    Broche: 'Body/Broche.svg'
  };

  const flipStyle = {
    transform: isFacingLeft ? 'scaleX(-1)' : 'scaleX(1)',
    transformOrigin: 'center',
    transition: 'transform 0.3s ease'
  };

  return (
    <div style={flipStyle}>
      <Avatar selectedSkin={selectedSkin} ropa={ropa} />
    </div>
  );
};

export default Movements;
