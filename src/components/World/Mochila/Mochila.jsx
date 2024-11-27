// src/components/Mochila.jsx
import React, { useState } from 'react';
import styles from './Mochila.module.css';

const categories = [
  'Armas',
  'Municiones',
  'Escudos',
  'Hierbas',
  'Piedras',
  'Libros',
  'Cartas',
  'Magia',
  'Alimentos',
  'Objetos',
  'Vestimenta'
];

const items = {
  Armas: ['Espada', 'Lanza', 'Arco'],
  Municiones: ['Flechas', 'Balas'],
  Escudos: ['Escudo de madera', 'Escudo de hierro'],
  Hierbas: ['Hierba curativa', 'Hierba venenosa'],
  Piedras: ['Piedra mágica', 'Piedra de poder'],
  Libros: ['Libro de hechizos', 'Libro de historia'],
  Cartas: ['Carta de amor', 'Carta de amenaza'],
  Magia: ['Hechizo de fuego', 'Hechizo de hielo'],
  Alimentos: ['Pan', 'Carne'],
  Objetos: ['Llave', 'Mapa'],
  Vestimenta: ['Casco', 'Armadura']
};

const Mochila = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const toggleMochila = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (category, item) => {
    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [category]: item
    }));
  };

  const prevCategory = () => {
    setCurrentCategoryIndex((currentCategoryIndex - 1 + categories.length) % categories.length);
  };

  const nextCategory = () => {
    setCurrentCategoryIndex((currentCategoryIndex + 1) % categories.length);
  };

  const currentCategory = categories[currentCategoryIndex];

  return (
    <div className={styles.mochila}>
      <button onClick={toggleMochila}>
        {isOpen ? 'Cerrar Mochila' : 'Abrir Mochila'}
      </button>
      {isOpen && (
        <div className={styles.content}>
          <div className={styles.category}>
            <div className={styles.navigation}>
              <button onClick={prevCategory}>&lt;</button>
              <h3>{currentCategory}</h3>
              <button onClick={nextCategory}>&gt;</button>
            </div>
            <ul>
              {items[currentCategory].map(item => (
                <li
                  key={item}
                  className={selectedItems[currentCategory] === item ? styles.selected : ''}
                  onClick={() => selectItem(currentCategory, item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mochila;
