// CharacterInventory.jsx
import { useState } from "react";
import styles from "./CharacterInventory.module.css";

const categories = [
  { id: "all", icon: "✨", label: "Todas" },
  { id: "weapons", icon: "🏹", label: "Armas" },
  { id: "shield", icon: "🛡️", label: "Escudos" },
  { id: "books", icon: "📚", label: "Libros" },
  { id: "maps", icon: "🗺️", label: "Mapas" },
  { id: "potions", icon: "🧪", label: "Pociones" },
  { id: "beast", icon: "🦠", label: "Bestias" },
];


const CharacterInventory = ({ inventory, setInventory, onEquip, onDropItemToWorld, pointerPos  }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredInventory = selectedCategory === "all"
    ? inventory
    : inventory.filter(item => item.category === selectedCategory);

  const handleUseItem = () => {
    if (!selectedItem) return;
    alert(`Usaste ${selectedItem.name}`);
  };

  const handleDropItem = () => {
    if (!selectedItem) return;
    setInventory(prev => prev.filter(item => item.id !== selectedItem.id));
    setSelectedItem(null);
    if (onDropItemToWorld && pointerPos) {
      onDropItemToWorld(selectedItem, pointerPos);
    }
    alert(`Tiraste ${selectedItem.name}`);
  };
  
  return (
    <div className={styles.inventoryWrapper}>
      <aside className={styles.categoryMenu}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.categoryButton} ${selectedCategory === cat.id ? styles.active : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
            title={cat.label}
          >
            {cat.icon}
          </button>
        ))}
      </aside>

      <section className={styles.inventoryGrid}>
        {filteredInventory.map(item => (
          <div
            key={item.id}
            className={`${styles.itemCard} ${selectedItem?.id === item.id ? styles.selected : ""}`}
            onClick={() => setSelectedItem(item)}
            title={item.name}
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
            <button onClick={handleUseItem}>Usar</button>
            <button onClick={() => onEquip && onEquip(selectedItem)}>Equipar</button>
            <button onClick={handleDropItem}>Tirar</button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default CharacterInventory;
