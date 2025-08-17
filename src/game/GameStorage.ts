interface GameState {
  lastSaved?: number;
  [key: string]: unknown;
}

// Updated to use local storage for testing
export function saveGameState(state: GameState) {
  localStorage.setItem('gameState', JSON.stringify(state));
}

export function loadGameState(): GameState | null {
  const state = localStorage.getItem('gameState');
  return state ? JSON.parse(state) : null;
}

export function resetGameState(defaultState: GameState) {
  saveGameState(defaultState);
}

export function updateGameState(updater: (state: GameState) => GameState): GameState {
  const currentState = loadGameState() || {} as GameState;
  const updatedState = updater(currentState);
  saveGameState(updatedState);
  return updatedState;
}

export function autoSaveGameState(state: GameState, delayMs = 30000) {
  setTimeout(() => saveGameState(state), delayMs);
}

export function getLastSavedTimestamp(): number | null {
  const state = loadGameState();
  return state ? Date.now() : null;
}