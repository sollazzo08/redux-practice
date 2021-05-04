import { combineReducers } from 'redux';
import entitiesReducer from './entities'

// We wrap our state with a parent entities state
export default combineReducers({
  entities: entitiesReducer
})