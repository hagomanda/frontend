import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { refresh } from "../features/userSlice";
import MainMandal from "../components/Mandal/view/MainMandal";
import MandalPage from "../components/Mandal/MandalPage";
import LoginPage from "../components/LoginPage";
import Main from "../components/Main/Main";
import CalendarPage from "../components/CalendarPage";
import Navbar from "../Navbar";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mainGoal/:id" element={<MandalPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
