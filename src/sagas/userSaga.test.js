import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "redux-saga/effects";
import {
  watchLogin,
  signInGoogle,
  watchRefresh,
  watchLogout,
  loginAPI,
  logoutAPI,
  refreshAPI,
} from "./userSaga";
import {
  loginRequest,
  loginSucceed,
  logoutRequest,
  logoutSucceed,
  logoutFailed,
  refresh,
  loginFailed,
} from "../reducers/userSlice";

describe("userSaga 테스트", () => {
  describe("#1. login 테스트", () => {
    it("login 성공", () => {
      const user = {
        email: "test@test.com",
        displayName: "test",
        profile: "http://test.com",
        newAccessToken: "testToken",
      };

      const res = {
        data: {
          isSuccess: true,
          ...user,
        },
      };

      return expectSaga(watchLogin)
        .withReducer(loginRequest)
        .dispatch({ type: loginRequest.type })
        .provide([[call(signInGoogle), user]])
        .provide([[call(loginAPI, user.email)]], res)
        .put({ type: loginSucceed.type, payload: user })
        .silentRun();
      //혹시 구글 로그인 해결 할 수 있으신분...
    });

    it("login 실패", () => {
      const error = new Error("Google Login Error");

      return expectSaga(watchLogin)
        .withReducer(loginRequest)
        .dispatch({ type: loginRequest.type })
        .provide([[call(signInGoogle), throwError(error)]])
        .put({ type: loginFailed.type, payload: "Google Login Error" })
        .silentRun();
    });

    it("refresh Token 발급 성공", () => {
      const res = {
        data: {
          isSuccess: true,
          email: "test@test.com",
          displayName: "test",
          profile: "http://test.com",
          newAccessToken: "testToken",
        },
      };

      return expectSaga(watchRefresh)
        .withReducer(refresh)
        .dispatch({ type: refresh.type, payload: undefined })
        .provide([[call(refreshAPI), res]])
        .put({
          type: loginSucceed.type,
          payload: {
            email: "test@test.com",
            displayName: "test",
            profile: "http://test.com",
          },
        })
        .silentRun();
    });
  });

  describe("#2. logout 테스트", () => {
    it("logout 성공", () => {
      const res = {
        statusText: "ok",
      };

      return expectSaga(watchLogout)
        .withReducer(logoutRequest)
        .dispatch({ type: logoutRequest.type })
        .provide([[call(logoutAPI), res]])
        .put({ type: logoutSucceed.type, payload: undefined })
        .silentRun();
    });

    it("logout 실패", () => {
      const res = {
        data: {
          message: "Logout Fail",
        },
      };

      return expectSaga(watchLogout)
        .withReducer(logoutRequest)
        .dispatch({ type: logoutRequest.type })
        .provide([[call(logoutAPI), res]])
        .put({ type: logoutFailed.type, payload: "ServerLogoutFailed" })
        .silentRun();
    });
  });
});
