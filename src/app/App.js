import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { refresh } from "../reducers/userSlice";
import IndexPage from "../components/IndexPage";
import GlobalNavBar from "../components/Header/GlobalNavBar";
import Navbar from "../components/Header/Navbar";
import LoginPage from "../components/LoginPage";
import Main from "../components/Main/Main";
import CalendarPage from "../components/Calendar/CalendarPage";
import MandalPage from "../components/Mandal/MandalPage";
import MyPage from "../components/MyPage";
import ErrorPage from "../components/shared/ErrorPage";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.withCredentials = true;
const JWT_EXPIRY_TIME = 3600 * 1000;

function App() {
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.user.loginSucceed);
  const refreshLoginState = useSelector(state => state.user.refreshLogin);

  useEffect(() => {
    dispatch(refresh());
  }, []);

  useEffect(() => {
    if (refreshLoginState) {
      setTimeout(() => dispatch(refresh()), JWT_EXPIRY_TIME);
    }
  }, [refreshLoginState]);

  return (
    <>
      <BrowserRouter>
        <GlobalNavBar />
        {loginState && <Navbar />}
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={loginState ? <Main /> : <LoginPage />} />
          <Route
            path="/mypage"
            element={loginState ? <MyPage /> : <LoginPage />}
          />
          <Route
            path="/mainGoal/:id"
            element={loginState ? <MandalPage /> : <LoginPage />}
          />
          <Route path="/main" element={loginState ? <Main /> : <LoginPage />} />
          <Route
            path="/calendar"
            element={loginState ? <CalendarPage /> : <LoginPage />}
          />
          <Route
            path="/*"
            element={<ErrorPage message="존재하지 않는 페이지입니다." />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
