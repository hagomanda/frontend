import { put, takeLatest, all, fork, call } from 'redux-saga/effects'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { loginRequest, loginSucceed, loginFailed, join } from './userSlice';
import { authentication } from "./firebase";

const axios = require('axios');
// const instance = axios.create({
// //   baseURL: 'http://localhost:8000/'
// });

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchJoin)
  ])
}

function* watchLogin() {
  yield takeLatest(loginRequest, login);
}

function* watchJoin() {
  yield takeLatest(join, login, "join");
}

async function signInGoogle() {
  const provieder = new GoogleAuthProvider();
  const googleLoginResult = await signInWithPopup(authentication, provieder);
  const { email, displayName, photoURL: profile } = googleLoginResult.user;
  return { email, displayName, profile };
}

async function loginServer(email) {
  const res = await axios.post('/api/auth/login', { email });
  return res;
}

async function joinServer(user) {
  const res = await axios.post("/api/users", { user });
  return res;
}

function* login(action){
  try{
    const signInGoogleResult = yield call(signInGoogle);

    if (signInGoogleResult && action === "join") {
      yield call(joinServer, signInGoogleResult);
    }

    const serverLoginResult = yield call(loginServer, signInGoogleResult.email);

    if (serverLoginResult.data.isSuccess) {
      const { email, displayName, profile, newAccessToken } = serverLoginResult.data
      yield put(loginSucceed({ email, displayName, profile }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    } else {
      yield put(loginFailed({
        name: "ServerLoginFailed"
      }));
    }
  } catch (error) {
    yield put(loginFailed(error));
  }
}
