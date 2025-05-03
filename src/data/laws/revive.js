// revive.js
export function reviveEntity(entity) {
    if (entity.type === 'NPC') {
      // lógica para revivir NPC
      entity.energy = 100;
      entity.status = 'revived';
    } else if (entity.type === 'player') {
      // lógica para revivir jugador
      entity.energy = 100;
      entity.status = 'revived';
    }
    // ...más lógica según reglas
  }
  