// goberments.js

export const regions = {
    OESTE: ['Aries', 'Tauro', 'Géminis'],
    SUR: ['Cáncer', 'Leo', 'Virgo'],
    ESTE: ['Libra', 'Escorpio', 'Sagitario'],
    NORTE: ['Capricornio', 'Acuario', 'Piscis'],
  };
  
  export const governments = {
    OESTE: {
      rulers: ['Emperatriz', 'Mafia'],
      description: 'Aries responde solo a la Emperatriz. Tauro y Géminis responden a la Mafia, que sigue la Emperatriz.',
      logic: (zone, votes) => {
        // votes: objeto con votos individuales, ej:
        // { Emperatriz: true/false, Mafia: true/false }
        // Aries solo depende de Emperatriz
        if (zone === 'Aries') {
          return votes.Emperatriz;
        }
        // Tauro y Géminis responden a Mafia, que sigue a Emperatriz
        if (zone === 'Tauro' || zone === 'Géminis') {
          // Mafia sigue a Emperatriz, por lo que su voto es igual al de Emperatriz
          return votes.Emperatriz;
        }
        return false; // Default fallback
      }
    },
  
    SUR: {
      rulers: ['Oráculo de las Pitonisas (Cáncer)', 'Rey (Leo)', 'Ministerio de Brujas (Virgo)'],
      description: 'Cada zona tiene su propio gobierno, la mayoría de votos decide.',
      logic: (zone, votes) => {
        // votes: objeto { Cancer: bool, Leo: bool, Virgo: bool }
        const yesVotes = [votes.Cancer, votes.Leo, votes.Virgo].filter(Boolean).length;
        return yesVotes >= 2;
      }
    },
  
    ESTE: {
      rulers: ['Dragon Co. (Libra)', 'Anarquía (Escorpio)', 'Autogobierno Centauros (Sagitario)'],
      description: 'Libra con Dragon Co., Escorpio sin ley, Sagitario autogobernado.',
      logic: (zone, votes) => {
        if (zone === 'Libra') {
          // Dragon Co. lógica propia, por ejemplo voto directo
          return votes.Libra;
        }
        if (zone === 'Escorpio') {
          // Anarquía, no hay ley
          return false;
        }
        if (zone === 'Sagitario') {
          // Autogobierno, voto local
          return votes.Sagitario;
        }
        return false;
      }
    },
  
    NORTE: {
      rulers: ['AIK', 'Junta Élfica (Capricornio)', 'Tronos (Acuario)', 'Junta Subacuática (Piscis)'],
      description: 'Regida por AIK y juntas NPC, mayoría simple.',
      logic: (zone, votes) => {
        // votes: { Capricornio: bool, Acuario: bool, Piscis: bool }
        const yesVotes = [votes.Capricornio, votes.Acuario, votes.Piscis].filter(Boolean).length;
        return yesVotes >= 2;
      }
    }
  };
  
  // Función para obtener región de una zona
  export function getRegionForZone(zone) {
    for (const [region, zones] of Object.entries(regions)) {
      if (zones.includes(zone)) return region;
    }
    return null;
  }
  
  // Función para obtener gobierno y lógica de una zona
  export function getGovernmentForZone(zone) {
    const region = getRegionForZone(zone);
    if (!region) return null;
    const gov = governments[region];
    return gov;
  }
  