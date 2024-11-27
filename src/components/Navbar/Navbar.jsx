import { useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(now.toLocaleDateString());
    };

    const interval = setInterval(updateTime, 1000);
    updateTime(); // Initialize immediately
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>MiJuego</div>
      <div className={styles.menu}>
        <div className={styles.time}>{time}</div>
        <div className={styles.date}>{date}</div>
        <button className={styles.optionsButton}>
          <FaCog />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
