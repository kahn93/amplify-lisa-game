// third-party
import { combineReducers } from 'redux';

// project import
import game from './game'; // Updated game state reducer import path
import user from './reducers/user'; // Corrected user reducer import path
import wallet from './wallet';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  wallet,
  user, // Added user reducer
  game, // Added game state reducer
});

export default reducers;
