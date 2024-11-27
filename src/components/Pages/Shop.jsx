import React, { useState } from "react";
import styles from "./Shop.module.css";

const Shop = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Espada de Fuego", price: 100, type: "compra" },
    { id: 2, name: "Escudo de Agua", price: 150, type: "compra" },
  ]);
  const [gold, setGold] = useState(500);

  const handlePurchase = (item) => {
    if (gold >= item.price) {
      setGold(gold - item.price);
      alert(`¡Has comprado ${item.name}!`);
    } else {
      alert("No tienes suficiente oro.");
    }
  };

  return (
    <div className={styles.shop}>
      <h2>Tienda</h2>
      <p>Oro disponible: {gold}</p>
      <ul>
        {inventory.map((item) => (
          <li key={item.id} className={styles[item.type]}>
            {item.name} - {item.price} oro
            <button onClick={() => handlePurchase(item)}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
