import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { refresh } from "../features/userSlice";

import MainGoalPage from "../components/MainGoalPage";
import axios from "axios";
import MandalPage from "../components/MandalPage";
import Navbar from "../Navbar";
import LoginPage from "../components/LoginPage";
import CreateButton from "../components/MyGoals/CreateButton";
import Main from "../components/Main/Main";

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
        <Route path="/create" element={<CreateButton />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
