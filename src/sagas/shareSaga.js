import { put, takeLatest, fork, call, all } from "redux-saga/effects";
import axios from "axios";
import {
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFailure,
  getUserInfoError,
  shareMandal,
  shareMandalSuccess,
  shareMandalError,
} from "../reducers/shareSlice";

export default function* shareSaga() {
  yield all([fork(watchGetUserInfo), fork(watchShareMandal)]);
}

function* watchGetUserInfo() {
  yield takeLatest(getUserInfo, getUserInfoSaga);
}

function* watchShareMandal() {
  yield takeLatest(shareMandal, shareMandalSaga);
}

function* getUserInfoSaga(action) {
  try {
    const res = yield call(getUserInfoAPI, action.payload);

    if (res.data.message) {
      yield put(getUserInfoFailure());
    } else {
      yield put(getUserInfoSuccess(res.data.user));
    }
  } catch (error) {
    yield put(getUserInfoError(error.message));
  }
}

function* shareMandalSaga(action) {
  try {
    const res = yield call(shareMandalAPI, action.payload);
    if (res.data.message) {
      yield put(shareMandalError());
    }
    yield put(shareMandalSuccess());
  } catch (error) {
    yield put(shareMandalError());
  }
}

const getUserInfoAPI = async email => {
  const result = await axios.get("/api/users", {
    headers: {
      otheruser: email,
    },
  });
  return result;
};

async function shareMandalAPI(req) {
  const { id, email } = req;
  const result = await axios.post(`/api/goals/mainGoal/${id}/users`, {
    email: email,
  });

  return result;
}
