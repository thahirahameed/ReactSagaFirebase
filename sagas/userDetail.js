import {take, put, call, fork} from 'redux-saga/effects';

import {userDetailsActions} from '../features/userDetail/userDetailsSlice';
import {ApiHelper, PersistanceHelper} from '../helpers';

const {request, success, failure, addItem} = userDetailsActions;

function callPostRequest(url, data, headers) {
  return ApiHelper.post(url, data, headers);
}

function callGetRequest(url, data, headers) {
  return ApiHelper.get(url, data, headers);
}

function getAccessToken() {
  return PersistanceHelper.getValue('accessToken');
}

function* watchRequest() {
  while (true) {
    const {payload} = yield take(request);
    try {
      let response;
      if (payload?.data?.requestType === 'POST') {
        const {requestType, ...rest} = payload.data;
        const accessToken = yield call(getAccessToken);
        response = yield call(callPostRequest, payload.url, rest, {
          'X-Access-Token': accessToken,
        });

        yield put(addItem(response));
      } else {
        response = yield call(callGetRequest, payload.url, {});
        yield put(success(response));
      }
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
