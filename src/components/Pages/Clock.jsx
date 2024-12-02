import React, { useState, useEffect } from "react";
import styles from "./Clock.module.css";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [planetaryPositions, setPlanetaryPositions] = useState([
    { planeta: "Sol", signo: "Aries", casa: 1 },
    { planeta: "Luna", signo: "Tauro", casa: 2 },
    { planeta: "Mercurio", signo: "Géminis", casa: 3 },
    { planeta: "Venus", signo: "Cáncer", casa: 4 },
    { planeta: "Marte", signo: "Leo", casa: 5 },
    { planeta: "Júpiter", signo: "Virgo", casa: 6 },
    { planeta: "Saturno", signo: "Libra", casa: 7 },
    { planeta: "Urano", signo: "Escorpio", casa: 8 },
    { planeta: "Neptuno", signo: "Sagitario", casa: 9 },
    { planeta: "Plutón", signo: "Capricornio", casa: 10 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.clockContainer}>
        <div className={styles.tableContainer}>
              <h2 className={styles.clockTitle}>Tránsitos Planetarios</h2>
      <table className={styles.clockTable}>
        <thead>
          <tr>
            <th>Planeta</th>
            <th>Signo</th>
            <th>Casa</th>
          </tr>
        </thead>
        <tbody>
          {planetaryPositions.map((position, index) => (
            <tr key={index}>
              <td>{position.planeta}</td>
              <td>{position.signo}</td>
              <td>{position.casa}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className={styles.clockTime}>
        <div className={styles.clockTitle}>{formatDate(currentTime)}</div>
        <div className={styles.clockTitle}> {formatTime(currentTime)}</div>
      </div>
    </div>
  );
};

export default Clock;
