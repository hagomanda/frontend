import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Navbar from "../Navbar";
import { refresh } from "../features/userSlice";

import MainGoalPage from "../components/MainGoalPage";
import axios from "axios";
import MandalPage from "../components/MandalPage";
import LoginPage from "../components/LoginPage";
import MainGoalLists from "../components/mainGoal/MainGoalLists";

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
      </Routes>
      <AppContainer>
        <MainGoalLists />
        <Navbar />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
