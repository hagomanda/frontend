import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, join } from "../features/userSlice";
const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid black;
  width: 500px;
  height: 600px;
  margin-top: 10%;
  padding: 30px, 20px;

  background-color: #ffffff;
  border-radius: 15px;
  text-align: center;

  .logo {
    width: 100px;
    margin-top: 50px;
  }

  .loginButton {
    width: 280px;
    height: 55px;
    margin-top: 40px;
  }

  .loginButton:hover {
    cursor: pointer;
    transform: scale(1.01, 1.01);
  }

  .joinText {
    margin: 180px 0 10px 0;
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
`;

export default function LoginPage() {
  const dispatch = useDispatch();
  const isServerLogin = useSelector(state => state.user.loginError);
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
    <LoginContainer>
      <LoginModal>
        <img className="logo" alt="logo" src="../img/logo.png" />
        <h1>Hagomanda</h1>
        <div>어쩌구저쩌구 명언</div>
        <img
          onClick={signInWithGoogle}
          className="loginButton"
          alt="loginButton"
          src="../img/button.png"
        />
        <div>
          {isServerLogin?.name === "ServerLoginFailed" && (
            <>
              <div>가입되지 않은 계정 입니다.</div>
              <p onClick={joinWithGoogleAccount} className="joinButton">
                구글 계정으로 회원가입하기
              </p>
            </>
          )}
          {isServerLogin?.name === "FirebaseError" &&
            "구글로그인 확인 해주세요"}
        </div>
        <p className="joinText">Dont have an account?</p>
        <p onClick={createGoogleAccount} className="joinButton">
          create google account
        </p>
      </LoginModal>
    </LoginContainer>
  );
}
