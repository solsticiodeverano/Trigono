/* eslint-disable react/display-name */
import { useImperativeHandle, forwardRef, useState } from 'react';

const Pointer = forwardRef((props, ref) => {
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    getPointerPos: () => pointerPos,
    setPointerPos: (newPos) => setPointerPos(newPos),
  }));

  return (
    <div>
      {/* Renderizado visual del puntero (si aplica) */}
    </div>
  );
});

export default Pointer;
