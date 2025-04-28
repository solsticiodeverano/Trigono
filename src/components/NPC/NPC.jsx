 // NPC.jsx
 
 import React from 'react';
 
 const NPC = ({ npc, tileSize }) => {
  const npcStyle = {
  position: 'absolute',
  width: `${tileSize}px`,
  height: `${tileSize}px`,
  fontSize: `${tileSize * 0.8}px`,
  textAlign: 'center',
  lineHeight: `${tileSize}px`,
  pointerEvents: 'none',
  userSelect: 'none',
  top: 0,
  left: 0,
  };
 
  return (
  <div className="npc" style={npcStyle}>
  {npc.emoji}
  </div>
  );
 };
 
 export default NPC;
