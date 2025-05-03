// love.js
export let loveEnergy = 50;

export function setLoveEnergy(value) {
  loveEnergy = Math.max(0, Math.min(100, value));
}
