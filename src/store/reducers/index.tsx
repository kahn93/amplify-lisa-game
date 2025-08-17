// third-party
import { combineReducers } from 'redux';

// project import
import game from './game'; // New game state reducer
import user from './user'; // New user reducer
import wallet from './wallet';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  wallet,
  user, // Added user reducer
  game, // Added game state reducer
});

export default reducers;
