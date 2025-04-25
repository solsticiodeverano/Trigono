import { useEffect, useState } from 'react';

const Logica = ({ enviarMensaje }) => {
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  useEffect(() => {
    // Verificar si los mensajes ya han sido enviados
    if (!mensajeEnviado) {
      console.log("Ejecutando efecto en Logica...");
      // Enviar mensaje de bienvenida al comenzar el juego
      enviarMensaje("🌟 Hola, esto es Trígono. Bienvenid@ al universo.");
      
      setTimeout(() => {
        console.log("Enviando mensaje de misión...");
        enviarMensaje("🧭 Comienza tu primera misión: explora tu entorno.");
      }, 2000);

      // Marcar los mensajes como enviados
      setMensajeEnviado(true); 
    }

  }, [mensajeEnviado, enviarMensaje]);

  return null;
};

export default Logica;
