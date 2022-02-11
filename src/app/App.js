import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  useEffect(() => {
    dispatch(refresh());
  }, []);

  return (
    <BrowserRouter>
      {/* <Modal child={<Todo id="6205d66b9f17beadd1cdec7d" />} /> */}
      <Routes>
        {/* <Route path="/" element={} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mainGoal/:id" element={<MandalPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/create" element={<CreateButton />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
