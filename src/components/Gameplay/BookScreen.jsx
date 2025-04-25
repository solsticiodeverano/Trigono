import { useState } from "react";
import styles from "./BookScreen.module.css";


const bookList = [
  { id: "weapons", icon: "🪄", title: "Libro de Armas", items: [] },
  { id: "skills", icon: "✨", title: "Libro de Poderes", items: [] },
  { id: "beast", icon: "🐾", title: "Libro de Animales", items: [] },
  { id: "clothes", icon: "🧥", title: "Libro de Vestimenta", items: [] },
  { id: "potions", icon: "🧪", title: "Libro de Pociones", items: [] },
  { id: "books", icon: "📚", title: "Libro de Libros", items: [] },
  { id: "shield", icon: "🛡️", title: "Libro de Escudos", items: [] },
];

const BookScreen = ({ allItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookIndex, setBookIndex] = useState(0);

  const currentBook = bookList[bookIndex];

  // Filtrar items por libro actual usando id como categoría
  const filteredItems = allItems.filter(
    (item) => item.category === currentBook.id
  );

  const handleLeft = () => {
    setBookIndex((prev) => (prev === 0 ? bookList.length - 1 : prev - 1));
  };

  const handleRight = () => {
    setBookIndex((prev) => (prev === bookList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.bookWrapper}>
      {!isOpen ? (
        <button className={styles.closedBook} onClick={() => setIsOpen(true)}>
          {currentBook.icon}
        </button>
      ) : (
        <div className={styles.openBook}>
          <div className={styles.header}>
            <button onClick={handleLeft}>⬅️</button>
            <h2>{currentBook.title}</h2>
            <button onClick={handleRight}>➡️</button>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className={styles.itemsGrid}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className={styles.itemCard}>
                  <span className={styles.icon}>{item.icon}</span>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              ))
            ) : (
              <p className={styles.emptyText}>No hay elementos en este libro.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookScreen;
