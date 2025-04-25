// components/Keys.jsx
import { useEffect } from 'react';

const useKeyboardControls = ({ onMove, onAttack, onJump, onOk, onBack, onSkill, onProtect, onRun }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          onMove?.(0, -1);
          break;
        case 'ArrowDown':
          onMove?.(0, 1);
          break;
        case 'ArrowLeft':
          onMove?.(-1, 0);
          break;
        case 'ArrowRight':
          onMove?.(1, 0);
          break;
        case ' ':
          onJump?.();
          break;
        case 'x':
          // Asegúrate de llamar onOk cuando se presiona 'x'
          onOk?.();
          break;
        case 'z':
          onBack?.();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          onSkill?.(parseInt(e.key));
          break;
        case 'Control':
          onProtect?.();
          break;
        case 'd':
          onAttack?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onMove, onAttack, onJump, onOk, onBack, onSkill, onProtect, onRun]);
};

export default useKeyboardControls;
