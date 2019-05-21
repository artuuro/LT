export const actionTypes = {
  LOAD_USERS: 'LOAD_USERS',
  LOAD_TODOS: 'LOAD_TODOS',
  LOAD_USERS_SUCCESS: 'LOAD_USERS_SUCCESS',
  LOAD_TODOS_SUCCESS: 'LOAD_TODOS_SUCCESS',
  ERROR: 'ERROR'
};

export function loadUsers () {
  return { type: actionTypes.LOAD_USERS };
};

export function loadTodos () {
  return { type: actionTypes.LOAD_TODOS };
};

export function loadUsersSuccess (data) {
  return { type: actionTypes.LOAD_USERS_SUCCESS, data };
};

export function loadTodosSuccess (data) {
  return { type: actionTypes.LOAD_TODOS_SUCCESS, data };
};

export function error (data) {
  return { type: actionTypes.ERROR, data };
};