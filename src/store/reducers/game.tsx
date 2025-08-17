// Game reducer to manage game-related state

interface GameState {
  coins: number;
  upgrades: string[];
  achievements: string[];
}

const initialState: GameState = {
  coins: 0,
  upgrades: [],
  achievements: [],
};

const game = (state = initialState, action: any): GameState => {
  switch (action.type) {
    case 'ADD_COINS':
      return { ...state, coins: state.coins + action.payload };
    case 'PURCHASE_UPGRADE':
      return { ...state, upgrades: [...state.upgrades, action.payload] };
    case 'UNLOCK_ACHIEVEMENT':
      return { ...state, achievements: [...state.achievements, action.payload] };
    default:
      return state;
  }
};

export default game;