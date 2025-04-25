import { useEffect } from 'react';

const Player = ({ playerPos, setPlayerPos, showAttack, setShowAttack, attackPosition, setAttackPosition, canAttack, setCanAttack, isPositionBlocked }) => {
  
  const movePlayer = (dx, dy) => {
    setPlayerPos((prevPos) => {
      const newX = prevPos.x + dx;
      const newY = prevPos.y + dy;

      if (isPositionBlocked(newX, newY)) {
        console.log("Movimiento bloqueado en posición:", { x: newX, y: newY });
        return prevPos;
      }

      console.log("Movimiento permitido a posición:", { x: newX, y: newY });
      return { x: newX, y: newY };
    });
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        movePlayer(0, -1);
        break;
      case 'ArrowDown':
        movePlayer(0, 1);
        break;
      case 'ArrowLeft':
        movePlayer(-1, 0);
        break;
      case 'ArrowRight':
        movePlayer(1, 0);
        break;
      case 'x':
        if (canAttack) {
          setShowAttack(true);
          setAttackPosition({ ...playerPos });

          setTimeout(() => {
            setShowAttack(false);
            setCanAttack(true);
          }, 1000);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPos]); // Add playerPos as a dependency

  return (
    <div
      className="player"
      style={{
        position: 'absolute',
        top: `${playerPos.y * 80 + 40}px`, // Adjusting position based on tile size
        left: `${playerPos.x * 80 + 40}px`,
        fontSize: '60px',
        transform: 'translate(-50%, -50%)',
      }}
    >
      🧙‍♀️ {/* Emoticono de la bruja */}
      {showAttack && attackPosition && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontSize: '40px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          ⚡ {/* Emoticono de ataque */}
        </div>
      )}
    </div>
  );
};

export default Player;
