import Body from './Body';
import Ropa from './Ropa';

// eslint-disable-next-line react/prop-types
const Avatar = ({selectedSkin}) => {
    return (
        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
            <Body skinIndex={selectedSkin}
                Sombra={'Body/Sombra.svg'}
                Cuerpo={'Body/Cuerpo.svg'}
                Cuello={'Body/Cuello.svg'}
                PiernaI={'Body/PiernaI.svg'}
                PiernaD={'Body/PiernaD.svg'}
                PieI={'Body/PieI.svg'}
                PieD={'Body/PieD.svg'}
                ManoI={'Body/ManoI.svg'}
                ManoD={'Body/ManoD.svg'}
                Cara={'Body/Cara.svg'}
                OjoI={'Body/OjoI.svg'}
                OjoD={'Body/OjoD.svg'}
                Boca={'Body/Boca.svg'}
            />
            <Ropa
             BotaI={'Body/BotaI.svg'}
             BotaD={'Body/BotaD.svg'}
                CapaD={'Body/CapaD.svg'}
                CapaI={'Body/CapaI.svg'}
                MangaD={'Body/MangaD.svg'}
                MangaI={'Body/MangaI.svg'}
                CuelloI={'Body/CuelloI.svg'}
                CapuchaF={'Body/CapuchaF.svg'}
                CapuchaB={'Body/CapuchaB.svg'}
                CapuchaSombra={'Body/CapuchaSombra.svg'}
                Broche={'Body/Broche.svg'}
            />
        </div>
    );
};

export default Avatar;
