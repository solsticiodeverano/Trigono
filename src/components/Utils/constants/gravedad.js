// Constants/gravedad.js
import { MUNDO, DIMENSIONES, obtenerTipoPorDefecto } from './mundo';

// Función que aplica la gravedad a un objeto dado
export const aplicarGravedad = (objeto) => {
  let { x, y, z } = objeto;  // Coordenadas actuales del objeto

  // Verificar si la posición de abajo es Aire (o fuera de rango)
  while (z > -30) { // Evitar que se mueva fuera del rango Z (-30 a 29)
    const tipoAbajo = obtenerTipoAbajo(x, y, z);

    if (tipoAbajo === 'Aire') {
      // Si el casillero debajo es Aire, baja el objeto 1 casillero
      z -= 1;
    } else {
      // Si el casillero debajo no es Aire (es Tierra, Agua, o Fuego), detenerse
      break;
    }
  }

  // Actualizar la posición del objeto con la nueva z
  objeto.z = z;
  return objeto;
};

// Función que obtiene el tipo del casillero debajo (en la posición x, y, z-1)
const obtenerTipoAbajo = (x, y, z) => {
  // Obtener las coordenadas del casillero debajo
  const casilleroAbajo = obtenerZona(x, y, z - 1);

  // Verificar el tipo del casillero debajo (si existe)
  if (casilleroAbajo) {
    return casilleroAbajo.tipo; // Devuelve el tipo de casillero (Aire, Tierra, Agua, Fuego)
  }

  // Si el casillero no existe (fuera de límites), devolver el tipo por defecto
  return 'Tierra'; // Si se pasa de Z=-30, se considera Tierra
};
