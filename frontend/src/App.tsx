import "./App.css";
import Portfolio from "./pages/Portfolio";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:profileId" element={<Portfolio />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>

      {/* <div> Welcome </div> */}
    </>
  );
}

export default App;
