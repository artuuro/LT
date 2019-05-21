import 'isomorphic-unfetch';
import { all, put, takeLatest } from 'redux-saga/effects';
import { actionTypes, error, loadUsersSuccess, loadTodosSuccess } from './actions';

const API_HOST = 'https://jsonplaceholder.typicode.com';

function * loadUsersSaga () {
  try {
    const res = yield fetch(`${API_HOST}/users`);
    const data = yield res.json();
    yield put(loadUsersSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function * loadTodosSaga () {
  try {
    const res = yield fetch(`${API_HOST}/todos`);
    const data = yield res.json();
    yield put(loadTodosSuccess(data));
  } catch (err) {
    yield put(error(err));
  }
}

function * rootSaga () {
  yield all([
    takeLatest(actionTypes.LOAD_USERS, loadUsersSaga),
    takeLatest(actionTypes.LOAD_TODOS, loadTodosSaga)
  ]);
}

export default rootSaga;
