import { combineReducers } from 'redux';
import { USER_LOGIN } from '../actions';

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
  case USER_LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.inputName,
        gravatarEmail: action.payload.inputEmail,
      },
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ playerReducer });

export default rootReducer;
