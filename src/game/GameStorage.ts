interface GameState {
  lastSaved?: number;
  [key: string]: unknown;
}

export function saveGameState(state: GameState) {
  try {
    localStorage.setItem("lisa_game_data", JSON.stringify(state));
  } catch (err) {
    // Optionally handle quota exceeded or other errors
  }
}

export function loadGameState(): GameState | null {
  try {
    const data = localStorage.getItem("lisa_game_data");
    return data ? (JSON.parse(data) as GameState) : null;
  } catch {
    return null;
  }
}

// Consolidated utility functions
export function resetGameState(defaultState: GameState) {
  saveGameState({ ...defaultState, lastSaved: Date.now() });
}

export function updateGameState(updater: (state: GameState) => GameState): GameState {
  const current = loadGameState();
  const updated = updater(current || {});
  saveGameState(updated);
  return updated;
}

export function autoSaveGameState(state: GameState, delayMs = 30000) {
  const timeout: NodeJS.Timeout = setTimeout(() => {
    saveGameState({ ...state, lastSaved: Date.now() });
  }, delayMs);
  return () => clearTimeout(timeout);
}

export function getLastSavedTimestamp(): number | null {
  const state = loadGameState();
  return state?.lastSaved ?? null;
}