import { useState, useEffect } from 'react';
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
  handleOkPress,
}) => {
  const [playerPos, setInternalPlayerPos] = useState(initialPosition);
  const [direction, setInternalDirection] = useState('down');

  const movePlayer = (dx, dy) => {
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
  };

  useKeyboardControls({
    onMove: (dx, dy) => {
      if (dx === 1) setInternalDirection('right');
      else if (dx === -1) setInternalDirection('left');
      else if (dy === 1) setInternalDirection('down');
      else if (dy === -1) setInternalDirection('up');

      movePlayer(dx, dy);
      setDirection(direction); // Update the direction in Zone1
      setPlayerPos(playerPos); // Update the player position in Zone1
    },
    onAttack: () => {
      if (canAttack) {
        setShowAttack(true);
        setAttackPosition({ ...playerPos });
        setCanAttack(false);

        const attackX = pointerPos.x;
        const attackY = pointerPos.y;

        setFixedTreePositions((prevTrees) => {
          return prevTrees
            .map((tree) => {
              if (tree.x === attackX && tree.y === attackY) {
                const newEnergy = Math.max(tree.energy - 10, 0);
                return { ...tree, energy: newEnergy };
              }
              return tree;
            })
            .filter((tree) => tree.energy > 0);
        });

        setTimeout(() => {
          setShowAttack(false);
          setCanAttack(true);
        }, 1000);
      }
    },
    onJump: () => {},
    onOk: handleOkPress, // Call handleOkPress from Zone1
    onBack: () => {},
    onSkill: (skillId) => {},
    onProtect: () => {},
    onRun: () => {},
  });

  useEffect(() => {
    setPlayerPos(playerPos);
    setDirection(direction);
  }, [playerPos, direction, setDirection, setPlayerPos]);

  return null;
};

export default PlayerController;
