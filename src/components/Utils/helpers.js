// Formatear números con separadores de miles
export const formatNumber = (num) => {
    return num.toLocaleString();
  };
  
  // Capitalizar la primera letra de un string
  export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  // Calcular el daño basado en stats y elementos
  export const calculateDamage = (attacker, defender, element) => {
    const baseDamage = attacker.attack - defender.defense;
    const elementMultiplier = getElementMultiplier(element, defender.element);
  
    return Math.max(baseDamage * elementMultiplier, 0);
  };
  
  // Obtener el multiplicador de elementos
  export const getElementMultiplier = (attackingElement, defendingElement) => {
    const multipliers = {
      Fuego: { Agua: 0.5, Viento: 1.2, Tierra: 1.0, Fuego: 1.0 },
      Agua: { Fuego: 1.2, Viento: 1.0, Tierra: 0.5, Agua: 1.0 },
      Viento: { Tierra: 1.2, Fuego: 1.0, Agua: 1.0, Viento: 1.0 },
      Tierra: { Viento: 0.5, Fuego: 1.0, Agua: 1.2, Tierra: 1.0 },
    };
  
    return multipliers[attackingElement]?.[defendingElement] || 1.0;
  };
  