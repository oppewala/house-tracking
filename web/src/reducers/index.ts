import { combineReducers } from 'redux';
import PropertyReducers from 'feature/Properties/PropertiesSlice';

const rootReducer = combineReducers({
  properties: PropertyReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
