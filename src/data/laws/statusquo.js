// statusquo.js
export const statusQuoNPCs = {
    NPC_5: { defendsLeader: true },
    NPC_6: { defendsLeader: false },
    // ...
  };
  
  export function shouldDefendLeader(npcId) {
    return statusQuoNPCs[npcId]?.defendsLeader ?? false;
  }
  