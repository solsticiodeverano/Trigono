import React, { useState } from 'react';

const Cities = ({ currentZone, citiesState, onVisitZone }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(prev => !prev);

  return (
    <div style={{
      border: '2px solid #444',
      padding: '10px',
      width: '260px',
      backgroundColor: '#222',
      color: '#eee',
      fontFamily: 'Arial, sans-serif',
      borderRadius: '8px',
      userSelect: 'none',
      position: 'fixed',
      top: '20px',
      left: '60px',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Zona actual: {currentZone}</strong>
        <button
          onClick={toggleExpanded}
          style={{
            backgroundColor: '#444',
            color: '#eee',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '20px',
            width: '32px',
            height: '32px',
            lineHeight: '32px',
            textAlign: 'center',
          }}
          aria-label={expanded ? 'Cerrar lista de zonas' : 'Abrir lista de zonas'}
        >
          {expanded ? '−' : '+'}
        </button>
      </div>

      {expanded && (
        <ul style={{ marginTop: '10px', paddingLeft: '20px', maxHeight: '300px', overflowY: 'auto' }}>
          {citiesState.map(city => (
            <li
              key={city.name}
              style={{
                color: city.visited ? '#4CAF50' : '#F44336',
                fontWeight: city.name === currentZone ? 'bold' : 'normal',
                cursor: city.visited ? 'pointer' : 'default',
                marginBottom: '6px',
                userSelect: 'none',
              }}
              title={city.visited ? 'Zona visitada' : 'Zona no visitada'}
              onClick={() => {
                if (city.visited && city.name !== currentZone) {
                  onVisitZone(city.name);
                }
              }}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cities;
