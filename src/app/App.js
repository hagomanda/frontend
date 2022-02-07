import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "../Navbar";
import LoginPage from "../components/LoginPage";
import { useDispatch } from "react-redux";
import { refresh } from "../features/userSlice";
import MainGoalPage from "../components/MainGoalPage";
import axios from "axios";
import MandalPage from "../components/MandalPage";
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
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <Navbar />
    // </div>
  );
}

export default App;
