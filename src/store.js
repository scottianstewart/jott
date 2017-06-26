import { createStore } from 'redux';
import rootReducer from './reducers/index';

const defaultState = {
  notes : [],
};

const store = createStore(rootReducer, defaultState);

export default store;
