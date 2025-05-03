import { NPCTypes } from './NPCPositions.jsx';

export const tribes = {
  Imperio: {
    leaders: [NPCTypes.EMPERATRIZ],
    soldiers: [NPCTypes.NINJA, NPCTypes.SAMURAI],
    enemies: [NPCTypes.DRIAD, NPCTypes.FAUN, NPCTypes.FAIRY],
    mission: 'Destruir driadas, faunos y hadas.',
    description:
      'La Emperatriz es la máxima líder. Ninjas y Samuráis son sus soldados. Su misión es destruir driadas, faunos y hadas.',
  },
  Fauns: {
    type: [NPCTypes.FAUN],
    allies: [NPCTypes.DRIAD, NPCTypes.FAIRY],
    enemies: ['Emperatriz', NPCTypes.NINJA, NPCTypes.SAMURAI],
    mission: 'Recuperar el trono.',
    description:
      'La tribu de faunos vive en el bosque y quiere recuperar el trono. Aliados de las Driadas y Hadas',
  },
  Empresas: {
    type: [NPCTypes.CEO],
    soldiers: [NPCTypes.CEO, NPCTypes.BUSINESSPERSON],
    enemies: [NPCTypes.DRIAD, NPCTypes.FAUN, NPCTypes.FAIRY],
    mission: 'Talar árboles de otras zonas para venderlos.',
    description:
      'Responden a la Emperatriz de Aries. CEO y empresarios talan árboles de otras zonas para venderlos.',
  },
  Driads: {
    leaders: [NPCTypes.DRIAD],
    allies: [NPCTypes.FAUN, NPCTypes.FAIRY],
    enemies: ['Emperatriz'],
    mission: 'Cuidar el equilibrio de los bosques y derrocar a la Emperatriz.',
    description:
      'La tribu de driadas vive en el bosque, aliada a los faunos para derrocar a la emperatriz. Su misión principal es cuidar el equilibrio de los bosques de todas las zonas.',
  },
  Bandidos: {
    leaders: [NPCTypes.MERCENARY],
    soldiers: [NPCTypes.MERCENARY, NPCTypes.SMUGGLER],
    allies: [NPCTypes.CEO, NPCTypes.BUSINESSPERSON],
    mission: 'Robar objetos y animales de otras zonas para venderlos.',
    description:
      'Mercenarios que roban objetos y animales de otras zonas para venderlos. Aliadas: hadas.',
  },
  Fairies: {
    leaders: [NPCTypes.FAIRY],
    mission: 'Cuidar los minerales de todas las regiones y devolver las piedras a su lugar.',
    description:
      'Hadas encargadas de cuidar los minerales de todas las regiones y devolver las piedras a su lugar.',
  },
  Espias: {
    leaders: [NPCTypes.SEER],
    protectors: [NPCTypes.SEER, NPCTypes.SAGE],
    infiltrators: [NPCTypes.INFILTRATOR],
    mission: 'Algunas pitonisas y sabios venden animales a mercenarios.',
    description:
      'Algunas pitonisas infiltradas venden animales a mercenarios y los dejan heridos.',
  },
  Oraculo: {
    leaders: [NPCTypes.SEER],
    protectors: [NPCTypes.SEER, NPCTypes.SAGE],
    infiltrators: [NPCTypes.INFILTRATOR],
    mission: 'Proteger el oráculo, las misiones y los animales. Sanar animales heridos.',
    description:
      'Pitonisas y sabios protegen el oráculo y los animales. Sanan animales de todas las zonas si tienen menos del 30% de vida.',
  },
  Reino: {
    leaders: [NPCTypes.GENERAL],
    soldiers: [NPCTypes.SECURITY, NPCTypes.GENERAL],
    mission: 'Eliminar líderes de tribus.',
    description:
      'El rey y sus guardianes buscan eliminar líderes de tribus',
  },
  Investigadores: {
    leaders: [NPCTypes.RESEARCHER],
    soldiers: [NPCTypes.RESEARCHER],
    mission: 'Investigar y denunciar traidores de la tribu de pitonisas al ministerio de brujas.',
    description:
      'descubrir traidores entre las pitonisas.',
  },

  Ministerio: {
    leaders: [NPCTypes.MINISTER],
    soldiers: [NPCTypes.MINISTER, NPCTypes.LEADER],
    mission: 'Regular objetos y leyes. Eliminar árboles que no sean de la zona y devolver objetos a su lugar.',
    description:
      'Ministerio de las brujas: regula objetos, ubicaciones y leyes. Elimina árboles foráneos y reubica objetos.',
  },
  Brujas: {
    leaders: [NPCTypes.WITCH],
    soldiers: [NPCTypes.WITCH],
    mission: 'Repartir los poderes por las regiones',
    description:
      'Las brujas van por las diferentes regiones distibuyendo los poderes segun las aspectaciones astrologicas',
  },
  DragonCo: {
    leaders: [NPCTypes.DRAGON_CO],
    soldiers: [NPCTypes.DRAGON_CO, NPCTypes.TAMER],
    allies: [NPCTypes.CIRCUS],
    mission: 'Regular la posesión de dragones. Capturar dragones salvajes y venderlos. Cirqueros transportan objetos, poderes y huevos de dragón.',
    description:
      'Dragon Co regula dragones, domadores los capturan y venden. Cirqueros viajan transportando objetos y huevos de dragón.',
  },
  Circo: {
    leaders: [NPCTypes.CIRCUS],
    soldiers: [NPCTypes.CIRCUS],
    allies: [NPCTypes.CIRCUS],
    mission: 'Pasean por las diferentes regiones llevando objetos, armas, semillas, animales y hevos de dragon de otras regiones',
    description:
      'El circo es un show rodante que lleva muestras de los mejores objetos de la region',
  },
  Clero: {
    leaders: [NPCTypes.PRIEST],
    soldiers: [NPCTypes.MONK, NPCTypes.PRIEST],
    mission: 'Eliminar cualquier árbol, animal u objeto que supere el número máximo.',
    description:
      'Sacerdotes y monjes eliminan excesos de árboles, animales y objetos.',
  },
  Iniciados: {
    leaders: [NPCTypes.INITIATE],
    soldiers: [NPCTypes.INITIATE, NPCTypes.VAMPIRES,],
    mission: 'Iniciados destruyen objetos que no sean de Escorpio.',
    description:
      'Iniciados destruyen objetos ajenos.',
  },
  JuntaNPC: {
    leaders: [NPCTypes.LEADER],
    soldiers: [NPCTypes.RAGECENTAUR, NPCTypes.GUARDIAN],
    mission: 'Autogobierno de centauros del bosque. Eliminar cualquier tribu de polaridad positiva',
    description:
      'Centauros guardianes de las tribus de NPC de polaridad negativa.',
  },
  Centauros: {
    leaders: [NPCTypes.LEADER],
    soldiers: [NPCTypes.CENTAUR],
    mission: 'Proteger animales mágicos y espíritus.',
    description:
      'Centauros guardianes de Sagitario y de los animales mágicos y espíritus.',
  },
  Magos: {
    leaders: [NPCTypes.MAGE],
    council: [NPCTypes.MAGE, NPCTypes.HERMIT],
    mission: 'Junta de magos cuida a los líderes de los gobiernos.',
    description:
      'Junta de magos protege líderes de gobierno.',
  },
  Elficos: {
    leaders: [NPCTypes.ELF],
    guardians: [NPCTypes.CENTAUR],
    council: [NPCTypes.MAGE, NPCTypes.HERMIT],
    mission: 'Eliminar a quienes ataquen animales mágicos o espíritus.',
    description:
      'Elfos protegen animales mágicos y espíritus. ',
  },
  
  Estelar: {
    leaders: [NPCTypes.ANGEL],
    protectors: [NPCTypes.ANGEL],
    healers: [NPCTypes.STAR],
    mission: 'Ángeles protegen líderes de tribus. Estrellas restauran vida a todo lo cercano.',
    description:
      'ángeles protegen líderes de tribus, estrellas restauran vida máxima a lo cercano.',
  },
  Devas: {
    leaders: [NPCTypes.DEVA],
    healers: [NPCTypes.DEVA],
    mission: 'Devas eliminan líderes de gobiernos',
    description:
      'Devas eliminan líderes de gobiernos',
  },
  Sirenas: {
    leaders: [NPCTypes.MERMAID],
    protectors: [NPCTypes.MERMAID, NPCTypes.TRITON],
    attackers: [NPCTypes.MEDUSA],
    mission: 'Sirenas y tritones protegen objetos, animales y árboles marinos. Medusas atacan todo lo que no sea marino.',
    description:
      'Sirenas y tritones protegen todo lo marino. Medusas atacan a todo lo no marino.',
  },
  Tritones: {
    leaders: [NPCTypes.TRITON],
    protectors: [NPCTypes.TRITON],
    attackers: [NPCTypes.MEDUSA],
    mission: 'Sirenas y tritones protegen objetos, animales y árboles marinos. Medusas atacan todo lo que no sea marino.',
    description:
      'Sirenas y tritones protegen todo lo marino. Medusas atacan a todo lo no marino.',
  }
};
