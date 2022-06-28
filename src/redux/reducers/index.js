import { combineReducers } from 'redux';
import { USER_LOGIN, GET_GRAVATAR } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
    profileImage: '',
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
  case GET_GRAVATAR:
    return {
      ...state,
      player: {
        ...state.player,
        profileImage: action.payload.url,
      },
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ playerReducer });

export default rootReducer;
