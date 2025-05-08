import { useEffect } from 'react';

export default function useFuego({ energias, setEnergias, isAttacking }) {
  useEffect(() => {
    if (isAttacking) {
      setEnergias(prev => ({ ...prev, fuego: Math.max(prev.fuego - 15, 0) }));
    }
  }, [isAttacking, setEnergias]);

  // Si la humedad es alta, no recupera fuego
  useEffect(() => {
    const timer = setInterval(() => {
      if (energias.humedad !== 'alta') {
        setEnergias(prev => ({ ...prev, fuego: Math.min(prev.fuego + 1, 700) }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [energias.humedad, setEnergias]);
}
