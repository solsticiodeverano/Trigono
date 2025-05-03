import './balance.css';

const MIN_TREES = 10;      // Mínimo para equilibrio
const MAX_TREES = 1500;    // Máximo permitido

const Balance = ({ currentZone, fixedTreePositions }) => {
  // Cuenta solo árboles maduros (no semillas ni plantas)
  const treeCount = fixedTreePositions.filter(
    tree => tree.type !== 'seed' && tree.type !== 'plant'
  ).length;

  const isBalanced = treeCount >= MIN_TREES && treeCount <= MAX_TREES;
  const isOverMax = treeCount > MAX_TREES;

  return (
    <div className="balance-display">
      <p style={{
        color: isBalanced ? '#4CAF50' : (isOverMax ? '#2196F3' : '#F44336'),
        fontWeight: 'bold'
      }}>
        Árboles: {treeCount} / {MIN_TREES} - {MAX_TREES}
      </p>
      {isOverMax ? (
        <p style={{ color: '#2196F3' }}>⚠️ Supera el máximo de árboles permitidos</p>
      ) : isBalanced ? (
        <p>✅ Equilibrio</p>
      ) : (
        <p>⚠️ Desequilibrio</p>
      )}
    </div>
  );
};

export default Balance;
