import { expectSaga } from "redux-saga-test-plan";
import {
  watchLogin,
  loginServer,
  signInGoogle,
  afterLoginSuccess,
} from "./userSaga";
import { call } from "redux-saga/effects";
import { loginRequest, loginSucceed } from "../reducers/userSlice";

it("get login Success", () => {
  const user = {
    email: "test@test.com",
    displayName: "test",
    profile: "http://test.test",
    newAccessToken: "testToken",
  };

  const res = {
    data: {
      isSuccess: "ok",
    },
  };

  return expectSaga(watchLogin)
    .withReducer(loginRequest)
    .dispatch({ type: loginRequest.type, payload: null })
    .provide([call(signInGoogle), user])
    .provide([call(loginServer, user.email), res])
    .provide([call(afterLoginSuccess, user), res])
    .put({ type: loginSucceed.type, payload: user })
    .run();
});
