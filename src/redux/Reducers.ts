import {combineReducers} from 'redux';

import ThemeReducer from './theme';

export default combineReducers({
  theme: ThemeReducer,
});
