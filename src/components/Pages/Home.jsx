import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.startContainer}>
        <h1>TRIGONO</h1>
      <div className={styles.buttonContainer}>
        <Link to="/zona1" className={styles.button}>
          Jugar
        </Link>
        <Link to="/creando" className={styles.button}>
          Nuevo Juego
        </Link>
        <Link to="/contacto" className={styles.button}>
          Contacto
        </Link>
      </div>
    </div>
  );
};

export default Home;
