import { useState } from "react";
import styles from "./CharacterInventory.module.css";

const categories = [
  { id: "all", icon: "✨", label: "Todas" },
  { id: "weapons", icon: "🪄", label: "Armas" },
  { id: "shield", icon: "🛡️", label: "Escudos" },
  { id: "books", icon: "📚", label: "Libros" },
  { id: "maps", icon: "🗺️", label: "Mapas" },
  { id: "potions", icon: "🧪", label: "Pociones" },
  { id: "beast", icon: "🦠", label: "Bestias" },
];

const initialInventory = [
  { id: 1, name: "Espada Rúnica", icon: "🗡️", description: "Una espada mágica con runas antiguas.", category: "weapons" },
  { id: 2, name: "Escudo de Hierro", icon: "🛡️", description: "Protección resistente contra ataques físicos.", category: "shield" },
  { id: 3, name: "Mapa del Bosque", icon: "🗺️", description: "Revela rutas ocultas del bosque encantado.", category: "maps" },
  { id: 4, name: "Poción Curativa", icon: "🧪", description: "Restaura salud.", category: "potions" },
  { id: 5, name: "Perro Guardián", icon: "🐶", description: "Una bestia leal que te protege.", category: "beast" },
];

const CharacterInventory = ({ onEquip }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inventory, setInventory] = useState(initialInventory);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredInventory = selectedCategory === "all"
    ? inventory
    : inventory.filter(item => item.category === selectedCategory);

  return (
    <div className={styles.inventoryWrapper}>
      <aside className={styles.categoryMenu}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.categoryButton} ${selectedCategory === cat.id ? styles.active : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.icon}
          </button>
        ))}
      </aside>

      <section className={styles.inventoryGrid}>
        {filteredInventory.map(item => (
          <div
            key={item.id}
            className={styles.itemCard}
            onClick={() => setSelectedItem(item)}
          >
            <span className={styles.itemEmoji}>{item.icon}</span>
          </div>
        ))}
      </section>

      {selectedItem && (
        <aside className={styles.itemDetails}>
          <h3>{selectedItem.name}</h3>
          <p>{selectedItem.description}</p>
          <div className={styles.itemActions}>
            <button>Usar</button>
            <button onClick={() => onEquip && onEquip(selectedItem)}>Equipar</button>
            <button>Tirar</button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default CharacterInventory;
