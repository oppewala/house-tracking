import { combineReducers } from 'redux';
import NewPropertyReducer from './new-property/NewPropertySlice';

export default combineReducers({
  newProperty: NewPropertyReducer,
});
