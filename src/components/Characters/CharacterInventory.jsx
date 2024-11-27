import { useState } from "react";
import styles from "./CharacterInventory.module.css"; // Asegúrate de crear un archivo CSS si necesitas estilos

const CharacterInventory = () => {
  // Inventario inicial del personaje
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Espejo de Venus",
      description: "Un objeto místico que refleja la verdad interior.",
      quantity: 1,
      icon: "🪞", // Puedes usar emojis o importar un ícono aquí
    },
  ]);

  return (
    <div className={styles.inventoryContainer}>
      <h2>Inventario del Personaje</h2>
      {inventory.length === 0 ? (
        <p>El inventario está vacío.</p>
      ) : (
        <ul className={styles.inventoryList}>
          {inventory.map((item) => (
            <li key={item.id} className={styles.inventoryItem}>
              <span className={styles.itemIcon}>{item.icon}</span>
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>
                  <strong>Cantidad:</strong> {item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharacterInventory;
