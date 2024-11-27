// Constants/aire.js

import { mundo } from './mundo'; // Estructura del mundo del juego

// Definición del tipo aire
const TIPO_AIRE = 'Aire';

// Estados del casillero tipo aire
const ESTADOS_AIRE = {
  HABILITADO: 'habilitado',
  INHABILITADO: 'inhabilitado',
};

// Función para verificar si un casillero de aire está habilitado
export const estaHabilitado = (x, y, z) => {
  const casillero = mundo[x]?.[y]?.[z];
  if (!casillero || casillero.tipo !== TIPO_AIRE) return false;

  return casillero.estado === ESTADOS_AIRE.HABILITADO;
};

// Función para ocupar un casillero de aire con arquitectura
export const ocuparConArquitectura = (x, y, z) => {
  const casillero = mundo[x]?.[y]?.[z];
  if (casillero && casillero.tipo === TIPO_AIRE) {
    casillero.estado = ESTADOS_AIRE.INHABILITADO; // Arquitectura lo inhabilita
    casillero.contenido = 'Arquitectura';
    console.log(`El casillero en x:${x}, y:${y}, z:${z} ahora está ocupado por Arquitectura.`);
  }
};

// Función para intentar crear vegetación en un casillero de aire
export const crearVegetacion = (x, y, z) => {
  const casillero = mundo[x]?.[y]?.[z];
  if (!casillero || casillero.tipo !== TIPO_AIRE) {
    console.log(`El casillero en x:${x}, y:${y}, z:${z} no es aire.`);
    return false;
  }

  if (casillero.estado === ESTADOS_AIRE.INHABILITADO) {
    console.log(`No se puede crear vegetación. El casillero en x:${x}, y:${y}, z:${z} está ocupado por arquitectura.`);
    return false;
  }

  casillero.contenido = 'Vegetación';
  console.log(`Vegetación creada en x:${x}, y:${y}, z:${z}.`);
  return true;
};

// Función para que un NPC ocupe un casillero de aire
export const ocuparConNPC = (x, y, z) => {
  const casillero = mundo[x]?.[y]?.[z];
  if (!casillero || casillero.tipo !== TIPO_AIRE) {
    console.log(`El casillero en x:${x}, y:${y}, z:${z} no es aire.`);
    return false;
  }

  if (casillero.estado === ESTADOS_AIRE.INHABILITADO || casillero.contenido) {
    console.log(`El casillero en x:${x}, y:${y}, z:${z} no está habilitado para NPC.`);
    return false;
  }

  casillero.contenido = 'NPC';
  console.log(`Un NPC ocupa el casillero en x:${x}, y:${y}, z:${z}.`);
  return true;
};

// Función para liberar un casillero de aire
export const liberarCasillero = (x, y, z) => {
  const casillero = mundo[x]?.[y]?.[z];
  if (casillero && casillero.tipo === TIPO_AIRE) {
    casillero.estado = ESTADOS_AIRE.HABILITADO;
    casillero.contenido = null;
    console.log(`El casillero en x:${x}, y:${y}, z:${z} ahora está habilitado y libre.`);
  }
};
