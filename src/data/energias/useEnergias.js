import { useState, useEffect } from "react";
import useTierra from "./tierra.js";
import useAgua from "./agua.js";
import useAire from "./aire.js";
import useFuego from "./fuego.js";

export default function useEnergias({ playerPos, waterTiles, isRunning, isDefending, isMoving }) {
  const [energias, setEnergias] = useState({
    tierra: 525, // 75% de 700
    agua: 525,
    aire: 525,
    fuego: 525,
    humedad: 'normal'
  });

  // Calcula la humedad según la distancia a waterTiles
  useEffect(() => {
    const minDist = Math.min(
      ...waterTiles.map(wt => Math.sqrt(Math.pow(wt.x - playerPos.x, 2) + Math.pow(wt.y - playerPos.y, 2)))
    );
    let newHumedad = 'alta';
    if (minDist > 5) newHumedad = 'normal';
    if (minDist > 10) newHumedad = 'baja';
    setEnergias(prev => ({ ...prev, humedad: newHumedad }));
  }, [playerPos, waterTiles]);

  // Llama a las funciones de cada energía para actualizar su valor
  useTierra({ energias, setEnergias });
  useAgua({ energias, setEnergias, isDefending });
  useAire({ energias, setEnergias, isMoving, isRunning });
  useFuego({ energias, setEnergias, isRunning });

  return energias;
}
