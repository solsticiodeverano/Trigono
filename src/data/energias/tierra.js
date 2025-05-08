import { useEffect } from 'react';

export default function useTierra({ energias, setEnergias, useFruit }) {
  // Ejemplo: recuperar tierra al usar una fruta
  useEffect(() => {
    if (useFruit) {
      setEnergias(prev => ({ ...prev, tierra: Math.min(prev.tierra + 50, 700) }));
    }
  }, [useFruit, setEnergias]);
}
