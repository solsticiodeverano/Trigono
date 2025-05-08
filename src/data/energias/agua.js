import { useEffect } from 'react';

export default function useAgua({ energias, setEnergias, isDefending }) {
  useEffect(() => {
    const timer = setInterval(() => {
      setEnergias(prev => {
        let newAgua = prev.agua;
        if (prev.humedad === 'alta') {
          newAgua = Math.min(newAgua + 1, 700);
        } else if (prev.humedad === 'normal') {
          // No cambia
        } else if (prev.humedad === 'baja') {
          newAgua = Math.max(newAgua - 1, 0);
        }
        return { ...prev, agua: newAgua };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [energias.humedad, setEnergias]);

  // Lógica de defensa: baja agua en vez de tierra
  useEffect(() => {
    if (isDefending) {
      setEnergias(prev => ({ ...prev, agua: Math.max(prev.agua - 10, 0) }));
    }
  }, [isDefending, setEnergias]);
}
