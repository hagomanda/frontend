import {
  put,
  takeLatest,
  all,
  fork,
  call,
  takeEvery,
  take,
} from "redux-saga/effects";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createBrowserHistory } from "history";
import axios from "axios";

import {
  loginRequest,
  loginSucceed,
  loginFailed,
  logoutRequest,
  logoutSucceed,
  logoutFailed,
  join,
  refresh,
} from "./userSlice";

import { authentication } from "./firebase";
import { getMandal, setMandal } from "./viewSlice";
import { createSocketChannel } from "./createSocketChannel";

const delay = ms => new Promise(res => setTimeout(res, ms));
const JWT_EXPIRY_TIME = 3600 * 1000;
// const JWT_EXPIRY_TIME = 62000;

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchJoin),
    fork(watchRefresh),
    fork(watchLogout),
    fork(watchGetMandal),
    fork(onNewMandal, "modifySuccess"),
  ]);
}

function* onNewMandal(type) {
  const channel = yield call(createSocketChannel, type);

  while (true) {
    try {
      const newMandal = yield take(channel);

      yield put(setMandal(newMandal));
    } catch (e) {
      alert(e.message);
    }
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest, loginSaga);
}

function* watchLogout() {
  yield takeLatest(logoutRequest, logoutSaga);
}

function* watchJoin() {
  yield takeLatest(join, loginSaga, "join");
}

function* watchRefresh() {
  yield takeEvery(refresh, silentRefreshSaga);
}

function* watchGetMandal() {
  yield takeLatest(getMandal, getMandalSaga);
}

async function signInGoogle() {
  const provider = new GoogleAuthProvider();
  const googleLoginResult = await signInWithPopup(authentication, provider);
  const { email, displayName, photoURL: profile } = googleLoginResult.user;

  return { email, displayName, profile };
}

async function loginServer(email) {
  const res = await axios.post("/api/auth/login", { email });
  return res;
}

async function logoutServer() {
  const res = axios.get("/api/auth/logout");
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

async function getMainGoal(id) {
  const res = await axios.get(`/api/goals/mainGoal/${id}`);
  return res;
}

function* silentRefreshSaga() {
  const res = yield call(refreshLogin);

  if (!res.data.isSuccess) {
    yield put(
      loginFailed({
        name: "refreshError",
      }),
    );
  } else {
    yield call(afterLoginSuccess, res.data);
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
      yield call(afterLoginSuccess, serverLoginResult.data);
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

function* logoutSaga() {
  try {
    const serverLogoutResult = yield call(logoutServer);

    if (serverLogoutResult.statusText) {
      yield call(afterLogoutSuccess, "/login");
    } else {
      yield put(
        logoutFailed({
          name: "ServerLogoutFailed",
        }),
      );
    }
  } catch (error) {
    yield put(logoutFailed(error));
  }
}

function* afterLoginSuccess(user) {
  const { email, displayName, profile, newAccessToken } = user;
  yield put(loginSucceed({ email, displayName, profile }));
  axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
  clearTimeout(delay);
  yield call(delay, JWT_EXPIRY_TIME - 60000);
  yield put(refresh());
}

function* afterLogoutSuccess(location) {
  const history = createBrowserHistory();

  axios.defaults.headers.common["Authorization"] = null;
  yield put(logoutSucceed());
  history.push(location);
}

function* getMandalSaga(action) {
  try {
    const res = yield call(getMainGoal, action.payload);

    if (res.data.message) {
      // 결과가 없는 경우(해당 url이 유효하지 않은 경우)
    } else {
      res.data.result.mainGoal["_id"] = action.payload;

      yield put(setMandal(res.data.result.mainGoal));
    }
  } catch (error) {
    console.log(error);
  }
}
