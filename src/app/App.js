import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "../Navbar";
import LoginPage from "../components/LoginPage";
import { useDispatch } from "react-redux";
import { refresh } from "../features/userSlice";

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
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <Navbar />
    // </div>
  );
}

export default App;
