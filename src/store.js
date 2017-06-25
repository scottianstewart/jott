import { createStore, compse } from 'redux';

import rootReducer from './reducers/index';

import notes from './data/notes';

const defaultState = {
  notes : notes,
};

const store = createStore(rootReducer, defaultState);

export default store;
