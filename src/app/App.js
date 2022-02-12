import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { refresh } from "../features/userSlice";
import CreateButton from "../components/CreateButton";

import MandalPage from "../components/Mandal/MandalPage";
import LoginPage from "../components/LoginPage";
import Main from "../components/Main/Main";
import CalendarPage from "../components/CalendarPage";
import MyPage from "../components/MyPage";

import Todo from "../components/Mandal/view/Todo";
import Modal from "../components/Modal";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.user.loginSucceed);

  useEffect(() => {
    dispatch(refresh());
  }, []);

  return (
    <BrowserRouter>
      {/* <Modal child={<Todo id="6205d66b9f17beadd1cdec7d" />} /> */}
      <Routes>
        {/* <Route path="/" element={} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={loginState ? <Main /> : <LoginPage />} />
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
        <Route path="/create" element={<CreateButton />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
