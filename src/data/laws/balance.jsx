import './balance.css';

const MIN_TREES = 10;      // Mínimo para equilibrio
const MAX_TREES = 1500;    // Máximo permitido

const MIN_WATER = 20;
const MAX_WATER = 200;

  const Balance = ({ currentZone, fixedTreePositions, waterTiles }) => {
    const treeCount = fixedTreePositions.filter(
      tree => tree.type !== 'seed' && tree.type !== 'plant'
    ).length;
  
    const waterCount = waterTiles.length;
  
    const isTreeBalanced = treeCount >= MIN_TREES && treeCount <= MAX_TREES;
    const isWaterBalanced = waterCount >= MIN_WATER && waterCount <= MAX_WATER;

  return (
    <div className="balance-display">
      <p style={{
        color: isTreeBalanced ? '#4CAF50' : '#F44336',
        fontWeight: 'bold'
      }}>
        Árboles: {treeCount} / {MIN_TREES} - {MAX_TREES}
      </p>
      <p style={{
        color: isWaterBalanced ? '#4CAF50' : '#F44336',
        fontWeight: 'bold'
      }}>
        Agua: {waterCount} / {MIN_WATER} - {MAX_WATER}
      </p>

      {(!isTreeBalanced || !isWaterBalanced) ? (
        <p>⚠️ Desequilibrio</p>
      ) : (
        <p>✅ Equilibrio</p>
      )}
    </div>
  );
};

export default Balance;
