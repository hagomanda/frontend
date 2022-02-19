import {
  put,
  takeLatest,
  all,
  fork,
  call,
  takeEvery,
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
} from "../reducers/userSlice";
import { authentication } from "../features/firebase";

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchJoin),
    fork(watchRefresh),
    fork(watchLogout),
  ]);
}

export function* watchLogin() {
  yield takeLatest(loginRequest, loginSaga);
}

export function* watchLogout() {
  yield takeLatest(logoutRequest, logoutSaga);
}

function* watchJoin() {
  yield takeLatest(join, loginSaga, "join");
}

export function* watchRefresh() {
  yield takeEvery(refresh, silentRefreshSaga);
}

export async function signInGoogle() {
  const provider = new GoogleAuthProvider();
  const googleLoginResult = await signInWithPopup(authentication, provider);
  const { email, displayName, photoURL: profile } = googleLoginResult.user;

  return { email, displayName, profile };
}

export async function loginAPI(email) {
  const res = await axios.post("/api/auth/login", { email });
  return res;
}

export async function logoutAPI() {
  const res = axios.get("/api/auth/logout");
  return res;
}

async function joinAPI(user) {
  const res = await axios.post("/api/users", { user });
  return res;
}

export async function refreshAPI(refreshToken) {
  const res = await axios.post("/api/auth/refresh", {
    refreshToken,
  });

  return res;
}

export function* silentRefreshSaga() {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = yield call(refreshAPI, refreshToken);

  if (!res.data.isSuccess) {
    yield put(
      loginFailed({
        name: "refreshError",
      }),
    );
  } else {
    const { email, displayName, profile, newAccessToken, newRefreshToken } =
      res.data;
    localStorage.setItem("refreshToken", newRefreshToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
    yield put(loginSucceed({ email, displayName, profile }));
  }
}

function* loginSaga(action) {
  try {
    const signInGoogleResult = yield call(signInGoogle);

    if (signInGoogleResult && action === "join") {
      yield call(joinAPI, signInGoogleResult);
    }

    const res = yield call(loginAPI, signInGoogleResult.email);

    if (res.data.isSuccess) {
      const { email, displayName, profile, newAccessToken, newRefreshToken } =
        res.data;

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      localStorage.setItem("refreshToken", newRefreshToken);
      yield put(loginSucceed({ email, displayName, profile }));
    } else {
      yield put(
        loginFailed({
          name: "ServerLoginFailed",
        }),
      );
    }
  } catch (error) {
    yield put(loginFailed(error.message));
  }
}

export function* logoutSaga() {
  try {
    const serverLogoutResult = yield call(logoutAPI);
    if (serverLogoutResult.data.result === "ok") {
      yield put(logoutSucceed());
      axios.defaults.headers.common["Authorization"] = null;
      localStorage.removeItem("refreshToken");
      const history = createBrowserHistory();
      history.push(location);
    } else {
      yield put(logoutFailed("ServerLogoutFailed"));
    }
  } catch (error) {
    yield put(logoutFailed(error.message));
  }
}
