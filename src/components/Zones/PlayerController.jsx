import { useState, useEffect, useRef } from 'react';
import useKeyboardControls from '../Keys/Keys.jsx';

const PlayerController = ({
  initialPosition,
  mapWidth,
  mapHeight,
  isPositionBlocked,
  setCurrentZone,
  zodiacZones,
  getInitialAnimalPositions,
  setAttackPosition,
  setDirection,
  setPlayerPos,
  setAnimalPositions,
  setShowAttack,
  setCanAttack,
  pointerPos,
  setFixedTreePositions,
  currentZone,
  handleAttack,
  handleGetPress,
  elementalEnergy,           // Energía global
  setElementalEnergy,
  inventory,                 // Inventario completo
  selectedShield,
  isDefending,
  setIsDefending}) => {
  const [playerPos, setInternalPlayerPos] = useState(initialPosition);
  const [direction, setInternalDirection] = useState('down');
  const [isRunning, setIsRunning] = useState(false);
  const lastMoveTime = useRef(Date.now());
  const [defenseReduction, setDefenseReduction] = useState(0.5); // 50% por defecto

  // Parámetros de velocidad
  const BASE_DELAY = 350; // ms, cuando viento = 0
  const MIN_DELAY = 120;  // ms, cuando viento = 100

  // Calcula delay dinámico
  const getMoveDelay = () => {
    const viento = elementalEnergy.aire ?? 0;
    const delay = BASE_DELAY - ((BASE_DELAY - MIN_DELAY) * viento / 100);
    return isRunning ? delay / 2 : delay;
  };

  // Movimiento pausado y dependiente de viento
  const tryMovePlayer = (dx, dy) => {
    const now = Date.now();
    const delay = getMoveDelay();

    if (now - lastMoveTime.current < delay) return; // Demasiado pronto para moverse

    // Si está corriendo y no hay energía, no puede correr
    if (isRunning && elementalEnergy.aire <= 0) {
      setIsRunning(false);
      return;
    }

    // Realiza el movimiento
    setInternalPlayerPos((prevPos) => {
      let newX = prevPos.x + dx;
      let newY = prevPos.y + dy;

      let currentIndex = zodiacZones.indexOf(currentZone);

      if (newX < 0) {
        const prevZone =
          zodiacZones[(currentIndex - 1 + zodiacZones.length) % zodiacZones.length];
        setCurrentZone(prevZone);
        setAnimalPositions(getInitialAnimalPositions(prevZone));
        return { x: mapWidth - 1, y: newY };
      }

      if (newX >= mapWidth) {
        const nextZone = zodiacZones[(currentIndex + 1) % zodiacZones.length];
        setCurrentZone(nextZone);
        setAnimalPositions(getInitialAnimalPositions(nextZone));
        return { x: 0, y: newY };
      }

      const boundedX = Math.max(0, Math.min(newX, mapWidth - 1));
      const boundedY = Math.max(0, Math.min(newY, mapHeight - 1));

      if (isPositionBlocked(boundedX, boundedY)) return prevPos;

      return { x: boundedX, y: boundedY };
    });

    setAttackPosition(null);

    // Si está corriendo, gasta energía de viento
    if (isRunning) {
      setElementalEnergy(prev => ({
        ...prev,
        aire: Math.max(prev.aire - 2, 0)
      }));
      if (elementalEnergy.aire - 2 <= 0) setIsRunning(false);
    }

    lastMoveTime.current = now;
  };

  // Manejo del botón de defensa
  const handleProtect = (isPressed) => {
      setIsDefending(isPressed);

    if (isPressed) {
      // Busca el escudo equipado para modificar la reducción
      const equippedShield = inventory.find(item => item.category === "shield" && item.equipped);
      const reduction = equippedShield?.powerReduct ?? 0.5;
      setDefenseReduction(reduction);
    }
  };

  useKeyboardControls({
    onMove: (dx, dy) => {
      tryMovePlayer(dx, dy);

      if (dx === 1) setInternalDirection('right');
      else if (dx === -1) setInternalDirection('left');
      else if (dy === 1) setInternalDirection('down');
      else if (dy === -1) setInternalDirection('up');

      setDirection(direction);
      setPlayerPos(playerPos);
    },
    onAttack: () => {
      // Aquí va tu lógica de ataque
      handleAttack();
    },
    onJump: () => {},
    onOk: handleAttack,
    onBack: () => {},
    onSkill: (skillId) => {},
    onProtect: handleProtect,
    onRun: () => setIsRunning(true),
    onGet: handleGetPress,
  });

  // Escucha keyup para dejar de correr
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === 'Shift') setIsRunning(false);
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  // Sincroniza posición y dirección con el server
  useEffect(() => {
    setPlayerPos(playerPos);
    setDirection(direction);
  }, [playerPos, direction, setDirection, setPlayerPos]);

  // Consumo de energía agua mientras defiende
 useEffect(() => {
  if (!isDefending) return;

  const interval = setInterval(() => {
    setElementalEnergy(prev => {
      const newAgua = Math.max(prev.agua - 1, 0);
      if (newAgua === 0) setIsDefending(false); // Auto-desactiva si se queda sin energía
      return { ...prev, agua: newAgua };
    });
  }, 300); // cada 300ms gasta 1 punto de agua

  return () => clearInterval(interval);
}, [isDefending, setElementalEnergy]);


  return null;
};

export default PlayerController;
