import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import LoginPage from '../components/LoginPage';


function App() {
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
