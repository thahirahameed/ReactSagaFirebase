import {fork} from 'redux-saga/effects';
import user from './user';
import userDetail from './userDetail';

export default function* rootSaga() {
  yield fork(user);
  yield fork(userDetail);
}
