import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Navbar from "../Navbar";
import { refresh } from "../features/userSlice";

import MainMandal from "../components/MainMandal";
import axios from "axios";
import MandalPage from "../components/MandalPage";
import LoginPage from "../components/LoginPage";
import MainGoalLists from "../components/mainGoal/MainGoalLists";
import CalendarPage from "../components/CalendarPage";

axios.defaults.withCredentials = true;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;

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
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
      <AppContainer>
        {/* <MainGoalLists /> */}
        {/* <Navbar /> */}
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
