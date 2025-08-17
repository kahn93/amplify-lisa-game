// Shared types for the project

export interface GameState {
  player?: {
    multiplier?: number;
    level?: number;
  };
  resources?: number;
  miningPower?: number;
  upgradeCost?: number;
  [key: string]: any; // Allow additional properties
}