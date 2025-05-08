import { useEffect, useRef } from 'react';

export default function useAire({ energias, setEnergias, isMoving, isRunning }) {
  const idleTimer = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isMoving) {
        setEnergias(prev => ({ ...prev, aire: Math.min(prev.aire + 1, 700) }));
      }
      // Si queda quieto 5 segundos, se estanca
      if (!isMoving) {
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
          setEnergias(prev => ({ ...prev, aire: prev.aire }));
        }, 5000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isMoving, setEnergias]);

  // Si usa OnRun, baja aire
  useEffect(() => {
    if (isRunning) {
      setEnergias(prev => ({ ...prev, aire: Math.max(prev.aire - 20, 0) }));
    }
  }, [isRunning, setEnergias]);
}
