import { actionTypes } from './actions';

export const dataDefaults = {
  error: false,
  users: false,
  todos: false
};

export default function reducer (state = dataDefaults, action) {
  switch (action.type) {
    case actionTypes.ERROR:
      return { ...state, ...{ error: action.error } };
    case actionTypes.LOAD_USERS_SUCCESS: 
      return { ...state, ...{ users: action.data } };
    case actionTypes.LOAD_TODOS_SUCCESS:
      return { ...state, ...{ todos: action.data } };

    default: return state;
  }
};
