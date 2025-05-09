import { useEffect } from 'react';

const useKeyboardControls = ({
  onMove, onAttack, onGet, onJump, onOk, onBack,
  onSkill, onProtect, onRun
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':    onMove?.(0, -1); break;
        case 'ArrowDown':  onMove?.(0, 1); break;
        case 'ArrowLeft':  onMove?.(-1, 0); break;
        case 'ArrowRight': onMove?.(1, 0); break;
        case ' ':          onJump?.(); break;
        case 'x':          onOk?.(); break;
        case 'z':          onBack?.(); break;
        case '1':
        case '2':
        case '3':
        case '4':          onSkill?.(parseInt(e.key)); break;
        case 'Control':    onProtect?.(true); break; // Activar defensa
        case 'g':          onAttack?.(); break;
        case 'Shift':      onRun?.(); break; // Shift para correr
        case 'd':          onGet?.(); break;
        default: break;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Control') onProtect?.(false); // Desactivar defensa
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onMove, onAttack, onGet, onJump, onOk, onBack, onSkill, onProtect, onRun]);
};

export default useKeyboardControls;
