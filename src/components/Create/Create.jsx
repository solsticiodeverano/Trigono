import React, { useState } from 'react';

const characters = {
  bruja: { icon: '🧙‍♀️', names: ['Bruja', 'Brujo', 'Bruj@'] },
  hechicera: { icon: '🧙‍♀️', names: ['Hechicera', 'Hechicero', 'Hechicer@'] },
  monja: { icon: '👩‍🦰', names: ['Monja', 'Monje', 'Monj@'] },
  brujaOscura: { icon: '🌑', names: ['Bruja Oscura', 'Brujo Oscuro', 'Bruj@ Oscuridad'] },
  herbolaria: { icon: '🌿', names: ['Herbolaria', 'Herbolario', 'Herbolari@'] },
  licantropa: { icon: '🐺', names: ['Licántropa', 'Licántropo', 'Licántrop@'] },
};

const Create = () => {
  const [selectedGender, setSelectedGender] = useState('mujer');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % 6);
    } else if (e.key === 'ArrowLeft') {
      setSelectedIndex((prevIndex) => (prevIndex - 1 + 6) % 6);
    }
  };

  const handleMouseOver = (index) => {
    setSelectedIndex(index);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setSelectedIndex(0); // Reiniciar la selección al cambiar de género
  };

  const getCharacterName = (index) => {
    const characterKeys = Object.keys(characters);
    return characters[characterKeys[index]].names[
      { mujer: 0, hombre: 1, diversidad: 2 }[selectedGender]
    ];
  };

  return (
    <div tabIndex="0" onKeyDown={handleKeyDown} style={{ outline: 'none', textAlign: 'center' }}>
      <h1>Selecciona un género</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {['mujer', 'hombre', 'diversidad'].map((gender) => (
          <div
            key={gender}
            onClick={() => handleGenderChange(gender)}
            onMouseOver={() => handleGenderChange(gender)}
            style={{
              border: selectedGender === gender ? '2px solid blue' : '1px solid gray',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2em' }}>
              {gender === 'mujer' ? '♀️' : gender === 'hombre' ? '♂️' : '⚧️'}
            </div>
            <div>{gender.charAt(0).toUpperCase() + gender.slice(1)}</div>
          </div>
        ))}
      </div>

      <h1>Selecciona un personaje</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {[0, 1].map((row) => (
          <div key={row} style={{ display: 'flex', justifyContent: 'center' }}>
            {Object.keys(characters).slice(row * 3, row * 3 + 3).map((key, index) => (
              <div
                key={key}
                onMouseOver={() => handleMouseOver(row * 3 + index)}
                style={{
                  border: selectedIndex === row * 3 + index ? '2px solid blue' : '1px solid gray',
                  padding: '10px',
                  margin: '5px',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2em' }}>{characters[key].icon}</div>
                <div>{getCharacterName(row * 3 + index)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Personaje seleccionado: {getCharacterName(selectedIndex)}</h2>
      </div>
    </div>
  );
};

export default Create;
