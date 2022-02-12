import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { refresh } from "../features/userSlice";

import IndexPage from "../components/IndexPage";
import GlobalNavBar from "../components/Header/GlobalNavBar";
import LoginPage from "../components/LoginPage";
import Main from "../components/Main/Main";
import CalendarPage from "../components/CalendarPage";
import Navbar from "../components/Header/Navbar";
import MandalPage from "../components/Mandal/MandalPage";
import MyPage from "../components/MyPage";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.user.loginSucceed);

  useEffect(() => {
    dispatch(refresh());
  }, []);

  return (
    <BrowserRouter>
      <GlobalNavBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={loginState ? <Main /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/mypage"
          element={loginState ? <MyPage /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/mainGoal/:id"
          element={
            loginState ? <MandalPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/main"
          element={loginState ? <Main /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/calendar"
          element={
            loginState ? <CalendarPage /> : <Navigate replace to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
