import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { loginRequest, join } from "../features/userSlice";
import Loading from "./shared/Loading";

const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid black;
  width: 400px;
  height: 450px;
  margin-top: 15%;
  padding: 30px, 20px;

  background-color: #ffffff;
  border-radius: 15px;
  text-align: center;

  .logo {
    width: 80px;
    margin-top: 30px;
  }

  .loginButton {
    width: 280px;
    height: 55px;
    margin-top: 20px;
  }

  .loginButton:hover {
    cursor: pointer;
    transform: scale(1.01, 1.01);
  }

  .joinText {
    bottom: 0;
  }

  .joinButton {
    margin: 0;
    color: blue;
  }

  .joinButton:hover {
    cursor: pointer;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const LoadingContainer = styled.div`
  margin-top: 100px;
`;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginLoading, loginSucceed, loginError } = useSelector(
    state => state.user,
  );

  useEffect(() => {
    if (loginSucceed) {
      navigate("/home");
    }
  }, [loginSucceed]);

  const signInWithGoogle = () => {
    dispatch(loginRequest());
  };

  const createGoogleAccount = () => {
    window.location.href = "https://accounts.google.com/signup";
  };

  const joinWithGoogleAccount = () => {
    dispatch(join());
  };

  return (
    <>
      {loginLoading ? (
        <LoadingContainer>
          <Loading
            bgColor="white"
            contents="로그인 완료 시 자동으로 페이지를 이동합니다."
          />
        </LoadingContainer>
      ) : (
        <LoginContainer>
          <LoginModal>
            <img className="logo" alt="logo" src="/img/logo.svg" />
            <h1>HAGOMANDA</h1>
            <img
              onClick={signInWithGoogle}
              className="loginButton"
              alt="loginButton"
              src="/img/button.png"
            />
            <div>
              {loginError?.name === "ServerLoginFailed" && (
                <>
                  <div>가입되지 않은 계정입니다.</div>
                  <p onClick={joinWithGoogleAccount} className="joinButton">
                    구글 계정으로 회원가입하기
                  </p>
                </>
              )}
              {loginError?.name === "FirebaseError" &&
                "구글로그인 확인 해주세요"}
            </div>
            <p className="joinText">{"Don't have an account?"}</p>
            <p onClick={createGoogleAccount} className="joinButton">
              Create google account
            </p>
          </LoginModal>
        </LoginContainer>
      )}
    </>
  );
}
