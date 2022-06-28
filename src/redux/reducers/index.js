import { combineReducers } from 'redux';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ playerReducer });

export default rootReducer;
