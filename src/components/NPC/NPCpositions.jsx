// NPCPositions.jsx

export const NPCTypes = {

  // ARIES
  // + Polaridad positiva
  EMPERATRIZ: 'EMPERATRIZ',
  NINJA: 'NINJA',
  SAMURAI: 'SAMURAI',
  // - Polaridad negativa
  MINOTAURO: 'MINOTAURO',
  FAUN: 'FAUN',
  SATIR: 'SATIR',

  // TAURO
  // +
  MAIN_CEO: 'MAIN_CEO',
  BUSINESSPERSON: 'BUSINESSPERSON',
  CEO: 'CEO',
  // -
  MANA: 'MANA',
  DUENDE: 'DUENDE',
  DRIAD: 'DRIAD',

  // GEMINIS
  // +
  MERCENARY: 'MERCENARY',
  SMUGGLER: 'SMUGGLER',
  HUNTER: 'HUNTER',         
  // -
  FAIRY: 'FAIRY',
  SPRITE: 'SPRITE',         
  QUEEN_FAIRY: 'QUEEN_FAIRY',   

  // CANCER
  // +
  TRAIDOR: 'TRAIDOR',
  INFILTRATOR: 'INFILTRATOR',
  SABIO: 'COMPLICE',            
  // -
  ORACLE: 'ORACLE',          
  SEER: 'SEER',
  SAGE: 'SAGE',

  // LEO
  // +
  KING: 'KING',
  SECURITY: 'SECURITY',
  GENERAL: 'GENERAL',
  // -
  SPY: 'SPY',
  DETECTIVE: 'DETECTIVE',
  RESEARCHER: 'RESEARCHER',

  // VIRGO
  // +
  PRIME_MINISTER: 'PRIME_MINISTER',
  MINISTER: 'MINISTER',
  LEADER: 'LEADER',
  // -
  COVEN_CREW: 'COVEN_CREW',
  POET: 'WITCH',
  NINFA: 'NINFA',        

  // LIBRA
  // +
  DRAGON_CO: 'DRAGON_CO',
  TAMER: 'TAMER',
  DRAGON_RIDER: 'DRAGON_RIDER', 
  // -
  CLOWN: 'CLOWN',
  AROBAT: 'ACROBAT',       
  JESTER: 'JESTER',            

  // ESCORPIO
  // +
  SUPREME_MONK: 'SUPREME_MONK',
  MONK: 'MONK',
  PRIEST: 'PRIEST',
  // -
  CHOSEN: 'CHOSEN',
  INITIATE: 'INITIATE',
  VAMPIRE: 'VAMPIRE',

  // SAGITARIO
  // +
  GUARDIAN: 'GUARDIAN',
  RAGE_CENTAUR: 'RAGE_CENTAUR',
  CYCLOPE: 'CYCLOPE',
  // -
  CENTAUR: 'CENTAUR',
  GNOME: 'GNOME',            
  VALKIRIA: 'VALKIRIA',            

  // CAPRICORNIO
  // +
  ELF_PRINCE: 'ELF_PRINCE',              
  ELF: 'ELF',
  HERMIT: 'HERMIT',
  // -
  MAGE: 'MAGE',
  WARLOCK: 'WARLOCK',          
  ELDER: 'ELDER',  

  // ACUARIO
  // +
  ANGEL: 'ANGEL',
  STAR: 'STAR',
  CELESTIAL: 'CELESTIAL',      
  // -
  DEVA: 'DEVA',
  BLACK_HOLE: 'BLACK_HOLE',              
  ENTITY: 'ENTITY',

  // PISCIS
  // +
  TRITON: 'TRITON',
  MEDUSA: 'MEDUSA',
  SEA_GUARDIAN: 'SEA_GUARDIAN',
  // -
  MERMAID: 'MERMAID',
  SIREN: 'SIREN',               
  CORAL_WITCH: 'CORAL_WITCH',
};

  // Aries
  export const initialNPCPositionsAries = [
    { id: 1, x: 10, y: 8, type: NPCTypes.FAUN, emoji: '👹', energy: 100, speed: 7000 },
    { id: 2, x: 12, y: 9, type: NPCTypes.FAUN, emoji: '👹', energy: 100, speed: 7000 },
    { id: 3, x: 14, y: 8, type: NPCTypes.FAUN, emoji: '👹', energy: 100, speed: 7000 },
    { id: 4, x: 16, y: 9, type: NPCTypes.FAUN, emoji: '👹', energy: 100, speed: 7000 },
    { id: 5, x: 10, y: 15, type: NPCTypes.NINJA, emoji: '🤺', energy: 100, speed: 6000 },
    { id: 6, x: 12, y: 16, type: NPCTypes.NINJA, emoji: '🤺', energy: 100, speed: 6000 },
    { id: 7, x: 14, y: 15, type: NPCTypes.NINJA, emoji: '🤺', energy: 100, speed: 6000 },
    { id: 8, x: 16, y: 16, type: NPCTypes.NINJA, emoji: '🤺', energy: 100, speed: 6000 },
    { id: 9, x: 15, y: 20, type: NPCTypes.SAMURAI, emoji: '🏋️‍♂️', energy: 100, speed: 5500 },
  ];
  
  // Tauro
  export const initialNPCPositionsTauro = [
    { id: 10, x: 20, y: 10, type: NPCTypes.DRIAD, emoji: '👾', speed: 7500 },
    { id: 11, x: 21, y: 11, type: NPCTypes.DRIAD, emoji: '👾', speed: 7500 },
    { id: 12, x: 22, y: 10, type: NPCTypes.DRIAD, emoji: '👾', speed: 7500 },
    { id: 13, x: 23, y: 11, type: NPCTypes.DRIAD, emoji: '👾', speed: 7500 },
    { id: 14, x: 24, y: 15, type: NPCTypes.BUSINESSPERSON, emoji: '🤵', speed: 7000 },
    { id: 15, x: 25, y: 16, type: NPCTypes.BUSINESSPERSON, emoji: '🤵', speed: 7000 },
    { id: 16, x: 26, y: 15, type: NPCTypes.BUSINESSPERSON, emoji: '🤵', speed: 7000 },
    { id: 17, x: 27, y: 16, type: NPCTypes.BUSINESSPERSON, emoji: '🤵', speed: 7000 },
    { id: 18, x: 28, y: 18, type: NPCTypes.CEO, emoji: '👳', speed: 5000 },
  ];
  
  // Géminis
  export const initialNPCPositionsGeminis = [
    { id: 19, x: 30, y: 10, type: NPCTypes.FAIRY, emoji: '🧚', speed: 6000 },
    { id: 20, x: 31, y: 11, type: NPCTypes.FAIRY, emoji: '🧚', speed: 6000 },
    { id: 21, x: 32, y: 10, type: NPCTypes.FAIRY, emoji: '🧚', speed: 6000 },
    { id: 22, x: 33, y: 11, type: NPCTypes.FAIRY, emoji: '🧚', speed: 6000 },
    { id: 23, x: 34, y: 15, type: NPCTypes.MERCENARY, emoji: '👤', speed: 8000 },
    { id: 24, x: 35, y: 16, type: NPCTypes.MERCENARY, emoji: '👤', speed: 8000 },
    { id: 25, x: 36, y: 15, type: NPCTypes.MERCENARY, emoji: '👤', speed: 8000 },
    { id: 26, x: 37, y: 16, type: NPCTypes.MERCENARY, emoji: '👤', speed: 8000 },
    { id: 27, x: 38, y: 18, type: NPCTypes.SMUGGLER, emoji: '🕴️', speed: 9000 },
  ];

  
// === CÁNCER ===
export const initialNPCPositionsCancer = [
    { id: 39, x: 40, y: 10, type: NPCTypes.SEER, emoji: '🧞‍♀️', speed: 6000 },
    { id: 40, x: 41, y: 11, type: NPCTypes.SEER, emoji: '🧞‍♀️', speed: 6000 },
    { id: 41, x: 42, y: 10, type: NPCTypes.SEER, emoji: '🧞‍♀️', speed: 6000 },
    { id: 42, x: 43, y: 11, type: NPCTypes.SEER, emoji: '🧞‍♀️', speed: 6000 },
    { id: 43, x: 44, y: 14, type: NPCTypes.INFILTRATOR, emoji: '🧞‍♀️', speed: 7500 },
    { id: 44, x: 45, y: 15, type: NPCTypes.INFILTRATOR, emoji: '🧞‍♀️', speed: 7500 },
    { id: 45, x: 46, y: 14, type: NPCTypes.INFILTRATOR, emoji: '🧞‍♀️', speed: 7500 },
    { id: 46, x: 47, y: 15, type: NPCTypes.INFILTRATOR, emoji: '🧞‍♀️', speed: 7500 },
    { id: 47, x: 48, y: 17, type: NPCTypes.SAGE, emoji: '👰', speed: 5000 },
  ];
  
  // === LEO ===
  export const initialNPCPositionsLeo = [
    { id: 48, x: 50, y: 10, type: NPCTypes.RESEARCHER, emoji: '👨‍🔬', speed: 6200 },
    { id: 49, x: 51, y: 11, type: NPCTypes.RESEARCHER, emoji: '👨‍🔬', speed: 6200 },
    { id: 50, x: 52, y: 10, type: NPCTypes.RESEARCHER, emoji: '👨‍🔬', speed: 6200 },
    { id: 51, x: 53, y: 11, type: NPCTypes.RESEARCHER, emoji: '👨‍🔬', speed: 6200 },
    { id: 52, x: 54, y: 15, type: NPCTypes.SECURITY, emoji: '💂', speed: 6500 },
    { id: 53, x: 55, y: 16, type: NPCTypes.GENERAL, emoji: '💂‍♀️', speed: 5500 },
  ];
  
  // === VIRGO ===
  export const initialNPCPositionsVirgo = [
    { id: 54, x: 60, y: 10, type: NPCTypes.WITCH, emoji: '🧙‍♀️', speed: 7000 },
    { id: 55, x: 61, y: 11, type: NPCTypes.WITCH, emoji: '🧙‍♀️', speed: 7000 },
    { id: 56, x: 62, y: 10, type: NPCTypes.MINISTER, emoji: '🧛‍♂️', speed: 6800 },
    { id: 57, x: 63, y: 11, type: NPCTypes.MINISTER, emoji: '🧛‍♂️', speed: 6800 },
    { id: 58, x: 64, y: 14, type: NPCTypes.LEADER, emoji: '👨‍⚖️', speed: 5500 },
  ];
  
  // === LIBRA ===
  export const initialNPCPositionsLibra = [
    { id: 59, x: 70, y: 10, type: NPCTypes.CLOWN, emoji: '🤹', speed: 7200 },
    { id: 60, x: 71, y: 11, type: NPCTypes.CLOWN, emoji: '🤹', speed: 7200 },
    { id: 61, x: 72, y: 10, type: NPCTypes.DRAGON_CO, emoji: '👨‍💼', speed: 8200 },
    { id: 62, x: 73, y: 11, type: NPCTypes.DRAGON_CO, emoji: '👨‍💼', speed: 8200 },
    { id: 63, x: 74, y: 14, type: NPCTypes.TAMER, emoji: '🏂', speed: 6800 },
  ];
  
  // === ESCORPIO ===
  export const initialNPCPositionsEscorpio = [
    { id: 64, x: 80, y: 10, type: NPCTypes.INITIATE, emoji: '🧕', speed: 6700 },
    { id: 65, x: 81, y: 11, type: NPCTypes.INITIATE, emoji: '🧕', speed: 6700 },
    { id: 66, x: 82, y: 10, type: NPCTypes.MONK, emoji: '👳‍♀️', speed: 6400 },
    { id: 67, x: 83, y: 11, type: NPCTypes.MONK, emoji: '👳‍♀️', speed: 6400 },
    { id: 68, x: 84, y: 14, type: NPCTypes.PRIEST, emoji: '🧞', speed: 6000 },
  ];
  
  // === SAGITARIO ===
  export const initialNPCPositionsSagitario = [
    { id: 69, x: 90, y: 10, type: NPCTypes.CENTAUR, emoji: '🏇', speed: 7000 },
    { id: 70, x: 91, y: 11, type: NPCTypes.CENTAUR, emoji: '🏇', speed: 7000 },
    { id: 71, x: 92, y: 10, type: NPCTypes.CENTAUR, emoji: '🏇', speed: 7000 },
    { id: 72, x: 93, y: 11, type: NPCTypes.CENTAUR, emoji: '🏇', speed: 7000 },
    { id: 73, x: 94, y: 15, type: NPCTypes.GUARDIAN, emoji: '🦸‍♂️', speed: 6500 },
    { id: 74, x: 95, y: 16, type: NPCTypes.GUARDIAN, emoji: '🦸‍♂️', speed: 6500 },
    { id: 75, x: 96, y: 15, type: NPCTypes.GUARDIAN, emoji: '🦸‍♂️', speed: 6500 },
    { id: 76, x: 97, y: 16, type: NPCTypes.GUARDIAN, emoji: '🦸‍♀️', speed: 6500 },
    { id: 77, x: 98, y: 18, type: NPCTypes.LEADER, emoji: '🦹‍♀️', speed: 5000 },
  ];
  
  // === CAPRICORNIO ===
  export const initialNPCPositionsCapricornio = [
    { id: 78, x: 100, y: 10, type: NPCTypes.ELF, emoji: '🧝', speed: 6800 },
    { id: 79, x: 101, y: 11, type: NPCTypes.ELF, emoji: '🧝', speed: 6800 },
    { id: 80, x: 102, y: 10, type: NPCTypes.ELF, emoji: '🧝', speed: 6800 },
    { id: 81, x: 103, y: 11, type: NPCTypes.ELF, emoji: '🧝', speed: 6800 },
    { id: 82, x: 104, y: 14, type: NPCTypes.MAGE, emoji: '🧙‍♂️', speed: 6000 },
    { id: 83, x: 105, y: 15, type: NPCTypes.MAGE, emoji: '🧙‍♂️', speed: 6000 },
    { id: 84, x: 106, y: 14, type: NPCTypes.MAGE, emoji: '🧙‍♂️', speed: 6000 },
    { id: 85, x: 107, y: 15, type: NPCTypes.MAGE, emoji: '🧙‍♂️', speed: 6000 },
    { id: 86, x: 108, y: 17, type: NPCTypes.HERMIT, emoji: '👨‍🌾', speed: 5000 },
  ];
  
  // === ACUARIO ===
  export const initialNPCPositionsAcuario = [
    { id: 87, x: 120, y: 10, type: NPCTypes.DEVA, emoji: '☄️', speed: 7000 },
    { id: 88, x: 121, y: 11, type: NPCTypes.DEVA, emoji: '☄️', speed: 7000 },
    { id: 89, x: 122, y: 10, type: NPCTypes.DEVA, emoji: '☄️', speed: 7000 },
    { id: 90, x: 123, y: 11, type: NPCTypes.DEVA, emoji: '☄️', speed: 7000 },
    { id: 91, x: 124, y: 14, type: NPCTypes.ANGEL, emoji: '👼', speed: 6500 },
    { id: 92, x: 125, y: 15, type: NPCTypes.ANGEL, emoji: '👼', speed: 6500 },
    { id: 93, x: 126, y: 14, type: NPCTypes.ANGEL, emoji: '👼', speed: 6500 },
    { id: 94, x: 127, y: 15, type: NPCTypes.ANGEL, emoji: '👼', speed: 6500 },
    { id: 95, x: 128, y: 17, type: NPCTypes.STAR, emoji: '🌟', speed: 5000 },
  ];
  
  // Piscis (completado)
  export const initialNPCPositionsPiscis = [
    { id: 28, x: 110, y: 5, type: NPCTypes.MERMAID, emoji: '🧜‍♀️', speed: 8900 },
    { id: 29, x: 111, y: 6, type: NPCTypes.MERMAID, emoji: '🧜‍♀️', speed: 8900 },
    { id: 30, x: 112, y: 5, type: NPCTypes.MERMAID, emoji: '🧜‍♀️', speed: 8900 },
    { id: 31, x: 113, y: 6, type: NPCTypes.MERMAID, emoji: '🧜‍♀️', speed: 8900 },
    { id: 32, x: 114, y: 10, type: NPCTypes.TRITON, emoji: '🧜‍♂️', speed: 8800 },
    { id: 33, x: 115, y: 11, type: NPCTypes.TRITON, emoji: '🧜‍♂️', speed: 8800 },
    { id: 34, x: 116, y: 10, type: NPCTypes.TRITON, emoji: '🧜‍♂️', speed: 8800 },
    { id: 35, x: 117, y: 11, type: NPCTypes.TRITON, emoji: '🧜‍♂️', speed: 8800 },
    { id: 36, x: 118, y: 13, type: NPCTypes.MEDUSA, emoji: '🦑', speed: 8500 },
  ];
  