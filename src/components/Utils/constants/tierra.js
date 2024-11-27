// Constants/tierra.js

// Tipos de tierra
export const TIPOS_TIERRA = [
    'Fertil',
    'Rocosa',
    'Cristalizada',
    'Arenosa',
    'Nevada',
    'Muerta',
    'Mineral',
    'Fósil',
    'Combustible'
  ];
  
  // Valor de energía por defecto
  export const ENERGIA_DEFECTO = 100;
  
  // Estado por defecto de la tierra (puede ser null o algún estado en el futuro)
  export const ESTADO_DEFECTO = null;
  
  // Función para crear un casillero de tierra con un tipo específico
  export const crearTierra = (tipo = 'Fertil', energia = ENERGIA_DEFECTO, estado = ESTADO_DEFECTO, objeto = null) => {
    if (!TIPOS_TIERRA.includes(tipo)) {
      console.error(`Tipo de tierra no válido: ${tipo}`);
      return null;
    }
  
    return {
      tipo,        // Tipo de la tierra (Fertil, Rocosa, Cristalizada, etc.)
      energia,     // Valor de energía de la tierra (por defecto 100)
      estado,      // Estado de la tierra (por defecto null)
      objeto,      // Objeto dentro de la tierra (por defecto null, puede ser cualquier objeto o recurso)
    };
  };
  
  // Ejemplo de tierras con diferentes tipos y características
  export const tierraFertil = crearTierra('Fertil', 120, null, { recurso: 'semilla' });
  export const tierraRocosa = crearTierra('Rocosa', 80, 'difícil', { recurso: 'piedra' });
  export const tierraCristalizada = crearTierra('Cristalizada', 90, 'rígida', { recurso: 'cristal' });
  export const tierraArenosa = crearTierra('Arenosa', 100, null, { recurso: 'arena' });
  export const tierraNevada = crearTierra('Nevada', 110, 'congelada', { recurso: 'nieve' });
  export const tierraMuerta = crearTierra('Muerta', 0, 'sin vida', null);
  export const tierraMineral = crearTierra('Mineral', 130, 'rica en minerales', { recurso: 'mineral' });
  export const tierraFosil = crearTierra('Fósil', 90, 'con fósiles', { recurso: 'fósil' });
  export const tierraCombustible = crearTierra('Combustible', 150, 'inflamable', { recurso: 'petróleo' });
  
  