import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { PiIntersectThreeThin } from "react-icons/pi";

const Home = () => {
  return (
    <div className={styles.startContainer}>
      <div className={styles.logo}><PiIntersectThreeThin/></div>
        <h1>TRIGONO</h1>
      <div className={styles.buttonContainer}>
        <Link to="/server" className={styles.button}>
          Iniciar
        </Link>
        <Link to="/creando" className={styles.button}>
          Nuevo Juego
        </Link>
      
      </div>
    </div>
  );
};

export default Home;
