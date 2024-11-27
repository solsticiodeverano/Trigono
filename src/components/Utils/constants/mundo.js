// Constants/mundo.js

export const DIMENSIONES = {
    // Dimensiones de cada casillero
    tamañoCasillero: 10, // cada casillero tiene 10px de largo, alto y profundidad
    largo: 90, // largo de la zona (X)
    alto: 30, // altura de la zona (Y)
    profundidad: 60, // rango de Z (-30 a 29)
  };
  
  export const MUNDO = {
    // El mundo está compuesto por 12 casas
    casas: 12,
  
    // Cada casa tiene 10 zonas
    zonasPorCasa: 10,
  
    // Definir las zonas por cada casa
    zonas: Array.from({ length: 12 }, (_, casaIndex) => {
      return Array.from({ length: 10 }, (_, zonaIndex) => {
        return {
          casa: casaIndex + 1,
          zona: zonaIndex + 1,
          // Cada zona tiene un valor de 90x30x60 casilleros
          casilleros: Array.from({ length: DIMENSIONES.largo }, (_, x) => {
            return Array.from({ length: DIMENSIONES.alto }, (_, y) => {
              return Array.from({ length: DIMENSIONES.profundidad }, (_, z) => {
                return {
                  // Inicialmente el valor en Z negativo es Tierra por defecto
                  tipo: z < 0 ? 'Tierra' : 'Aire',
                  x, y, z, // Coordenadas dentro de la zona
                };
              });
            });
          }),
        };
      });
    }),
  };
  
  // Función para obtener la zona en base a las coordenadas X, Y, Z
  export const obtenerZona = (x, y, z) => {
    const casa = Math.floor(x / DIMENSIONES.largo) + 1;
    const zonaEnCasa = Math.floor(y / DIMENSIONES.alto) + 1;
  
    return {
      casa,
      zonaEnCasa,
      casillero: {
        x: x % DIMENSIONES.largo,
        y: y % DIMENSIONES.alto,
        z: Math.max(Math.min(z, 29), -30), // Asegura que z esté entre -30 y 29
      },
    };
  };
  
  // Función para mover en el eje X (circular entre las casas)
  export const moverEnEjeX = (x, movimiento) => {
    let nuevaCasa = (Math.floor(x / DIMENSIONES.largo) + (movimiento > 0 ? 1 : -1)) % 12;
    if (nuevaCasa < 0) nuevaCasa = 11; // Circular hacia atrás
    return nuevaCasa * DIMENSIONES.largo + (movimiento > 0 ? 0 : DIMENSIONES.largo - 1); // Nueva posición X
  };
  
  // Función para mover en el eje Y (controlando las zonas)
  export const moverEnEjeY = (y, movimiento) => {
    const nuevaZona = Math.floor((y + movimiento) / DIMENSIONES.alto) + 1;
    if (nuevaZona <= 10 && nuevaZona >= 1) {
      return (nuevaZona - 1) * DIMENSIONES.alto; // Nueva posición Y dentro de la zona
    }
    return y; // No se mueve si está fuera de las zonas
  };
  
  // Función para verificar tipo de terreno por defecto
  export const obtenerTipoPorDefecto = (z) => {
    return z < 0 ? 'Tierra' : 'Aire'; // Tierra en valores negativos de Z, Aire en los positivos
  };
  
  // Definir los tipos de terreno
  export const TIPOS_TERRITORIO = ['Aire', 'Tierra', 'Agua', 'Fuego'];
  
  