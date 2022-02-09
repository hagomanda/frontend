import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import { authentication } from "./firebase";
import {
  join,
  loginFailed,
  loginRequest,
  loginSucceed,
  refresh,
} from "./userSlice";

const delay = ms => new Promise(res => setTimeout(res, ms));
const JWT_EXPIRY_TIME = 3600 * 1000;
// const JWT_EXPIRY_TIME = 62000;

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchJoin), fork(watchRefresh)]);
}

function* watchLogin() {
  yield takeLatest(loginRequest, loginSaga);
}

function* watchJoin() {
  yield takeLatest(join, loginSaga, "join");
}

function* watchRefresh() {
  yield takeEvery(refresh, silentRefreshSaga);
}

async function signInGoogle() {
  const provieder = new GoogleAuthProvider();
  const googleLoginResult = await signInWithPopup(authentication, provieder);
  const { email, displayName, photoURL: profile } = googleLoginResult.user;

  return { email, displayName, profile };
}

async function loginServer(email) {
  const res = await axios.post("/api/auth/login", { email });
  return res;
}

async function joinServer(user) {
  const res = await axios.post("/api/users", { user });
  return res;
}

async function refreshLogin() {
  const res = await axios.post("/api/auth/refresh");
  return res;
}

function* silentRefreshSaga() {
  const res = yield call(refreshLogin);
  console.log(res);
  if (!res.data.isSuccess) {
    yield put(
      loginFailed({
        name: "refreshError",
      }),
    );
  } else {
    yield call(afterSuccess, res.data);
  }
}

function* loginSaga(action) {
  try {
    const signInGoogleResult = yield call(signInGoogle);

    if (signInGoogleResult && action === "join") {
      yield call(joinServer, signInGoogleResult);
    }

    const serverLoginResult = yield call(loginServer, signInGoogleResult.email);

    if (serverLoginResult.data.isSuccess) {
      yield call(afterSuccess, serverLoginResult.data);
    } else {
      yield put(
        loginFailed({
          name: "ServerLoginFailed",
        }),
      );
    }
  } catch (error) {
    yield put(loginFailed(error));
  }
}

function* afterSuccess(user) {
  const { email, displayName, profile, newAccessToken } = user;
  yield put(loginSucceed({ email, displayName, profile }));
  axios.defaults.headers.common["Authorization"] = newAccessToken;
  clearTimeout(delay);
  yield call(delay, JWT_EXPIRY_TIME - 60000);
  yield put(refresh());
}
