// NPCPositions.jsx


export const NPCTypes = {
    APPRENTICE: 'APPRENTICE',
    SECURITY: 'SECURITY',
    TRIBE_MEMBER: 'TRIBE_MEMBER',
    MINISTER: 'MINISTER',
   };
   
   
   const { APPRENTICE, SECURITY, TRIBE_MEMBER, MINISTER } = NPCTypes;
   
   
   export const initialNPCPositionsAries = [
    { id: 1, x: 10, y: 8, type: APPRENTICE, energy: 100, emoji: '🧕', speed: 7000 }, // Aprendiz
    { id: 2, x: 10, y: 15, type: SECURITY, energy: 100, emoji: '💂', speed: 12000 }, // SECURITY
    { id: 3, x: 15, y: 40, type: TRIBE_MEMBER, energy: 100, emoji: '🧝‍♀️', speed: 8000 }, // TRIBE_MEMBER
   ];
   
   
   export const initialNPCPositionsPiscis = [
    { id: 34, x: 110, y: 5, type: MINISTER, emoji: '🧙', speed: 8900 }, // MINISTER (ficticio)
   ];
   