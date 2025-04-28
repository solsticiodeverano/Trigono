// NPCPositions.jsx


export const NPCTypes = {
    APPRENTICE: 'APPRENTICE',
    SECURITY: 'SECURITY',
    TRIBE_MEMBER: 'TRIBE_MEMBER',
    MINISTER: 'MINISTER',
   };
   
   
   const { APPRENTICE, SECURITY, TRIBE_MEMBER, MINISTER } = NPCTypes;
   
   
   export const initialNPCPositionsAries = [
    { id: 1, x: 5, y: 5, type: APPRENTICE, emoji: '🧕', speed: 7000 }, // Aprendiz
    { id: 2, x: 10, y: 10, type: SECURITY, emoji: '💂', speed: 12000 }, // SECURITY
    { id: 3, x: 15, y: 5, type: TRIBE_MEMBER, emoji: '🧝‍♀️', speed: 8000 }, // TRIBE_MEMBER
   ];
   
   
   export const initialNPCPositionsPiscis = [
    { id: 34, x: 110, y: 5, type: MINISTER, emoji: '🧙', speed: 8900 }, // MINISTER (ficticio)
   ];
   