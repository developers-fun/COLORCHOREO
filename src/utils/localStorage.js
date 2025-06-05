export const STORAGE_KEY = 'colorChoreographer';

export function saveAnimation(colors, settings) {
  const stored = getStoredAnimations();
  const newAnimation = { colors, settings, timestamp: Date.now() };
  
  stored.unshift(newAnimation);
  if (stored.length > 3) stored.pop();
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return stored;
}

export function getStoredAnimations() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function removeAnimation(index) {
  const stored = getStoredAnimations();
  stored.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return stored;
}