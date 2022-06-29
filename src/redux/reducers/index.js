import { combineReducers } from 'redux';
import { USER_LOGIN, GET_GRAVATAR, GET_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  profileImage: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.payload.inputName,
      gravatarEmail: action.payload.inputEmail,
    };
  case GET_GRAVATAR:
    return {
      ...state,
      profileImage: action.payload.url,
    };
  case GET_POINTS:
    return {
      ...state,
      score: state.score + action.payload.points,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player: playerReducer });

export default rootReducer;
