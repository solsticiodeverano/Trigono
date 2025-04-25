import { useEffect, useRef } from 'react';
import styles from './Consola.module.css';

const Consola = ({ mensajes = [] }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  // Mostrar solo los últimos 3 mensajes
  const mensajesLimitados = mensajes.slice(-3);

  return (
    <div className={styles.container}>
      {mensajesLimitados.map((msg, i) => (
        <div
          key={i}
          className={`${styles.msg} ${styles[msg.tipo] || ''}`}
        >
          {msg.icono} {msg.texto}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Consola;
