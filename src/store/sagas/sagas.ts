import { all, fork } from 'redux-saga/effects';
import blogSaga from './blogSaga';

export function* rootSaga() {
  yield all([fork(blogSaga)])
}